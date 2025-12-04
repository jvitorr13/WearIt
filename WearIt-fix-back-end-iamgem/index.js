require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { GoogleGenAI } = require("@google/genai");

const users = require('./users');
const routes = require('./routes');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'sua_chave_secreta';

app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: 'Usuário não encontrado' });
  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) return res.status(401).json({ message: 'Senha inválida' });
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
});

app.get('/me', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token não fornecido' });
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ message: 'Token válido!', data: decoded });
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
});

async function startServer() {
  try {
    if (!process.env.GEMINI_API_KEY) throw new Error("GEMINI_API_KEY não definida no .env");

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    console.log('Google GenAI (Nova SDK) inicializado.');

    app.post('/generate', async (req, res) => {
      try {
        const { prompt, images } = req.body; // 'images' chega como array de strings base64

        if (!prompt) return res.status(400).json({ error: "Nenhum prompt fornecido." });

        console.log(`\n--- Gerando Imagem Nativamente (Gemini/Imagen) ---`);
        console.log(`Prompt: "${prompt}"`);

        const contents = [];

        if (images && Array.isArray(images)) {
          images.forEach((base64Raw) => {
             if (base64Raw) {
               const cleanBase64 = base64Raw.includes(',') ? base64Raw.split(',')[1] : base64Raw;
               
               contents.push({
                 inlineData: {
                   mimeType: "image/png", 
                   data: cleanBase64,
                 },
               });
             }
          });
        }

        contents.push({ text: prompt });

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-image",
          contents: contents,
        });

       
        const candidate = response.candidates[0];
        let imageBase64 = null;

        if (candidate.content && candidate.content.parts) {
            for (const part of candidate.content.parts) {
                if (part.inlineData) {
                    imageBase64 = part.inlineData.data;
                    break; 
                }
            }
        }

        if (!imageBase64) {
            console.log("Nenhuma imagem gerada. Resposta:", JSON.stringify(candidate));
            return res.status(500).json({ error: "O modelo não retornou uma imagem." });
        }

        console.log("Imagem gerada com sucesso!");

       
        const finalImageUrl = `data:image/png;base64,${imageBase64}`;
        
        res.json({ imageUrl: finalImageUrl });

      } catch (err) {
        console.error("❌ Erro:", err.message);
        res.status(500).json({ error: "Falha ao criar imagem.", details: err.message });
      }
    });

    app.use(routes);

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });

  } catch (error) {
    console.error("💀 Falha fatal:", error);
    process.exit(1);
  }
}

startServer();