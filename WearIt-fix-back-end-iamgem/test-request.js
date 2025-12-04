const fs = require('fs');

async function testarGeracao() {
    console.log("📸 Lendo imagens...");

    // Função auxiliar para converter arquivo em Base64
    const toBase64 = (filePath) => {
        try {
            const img = fs.readFileSync(filePath);
            return Buffer.from(img).toString('base64');
        } catch (e) {
            console.error(`Erro ao ler ${filePath}:`, e.message);
            return null;
        }
    };

    // SUBSTITUA PELO NOME DAS SUAS IMAGENS NA PASTA
    const base64Person = toBase64('./pessoa.jpg'); 
    const base64Cloth = toBase64('./roupa.jpg');

    if (!base64Person || !base64Cloth) return;

    console.log("🚀 Enviando para o servidor...");

    try {
        const response = await fetch('http://127.0.0.1:3000/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: "make it realistic",
                // Enviando já com o prefixo ou sem, seu servidor trata? 
                // No código anterior fizemos o replace, então pode mandar puro ou com prefixo.
                imagePerson: base64Person, 
                imageCloth: base64Cloth
            })
        });

        const data = await response.json();

        if (response.status !== 200) {
            throw new Error(`Erro do servidor: ${data.error || JSON.stringify(data)}`);
        }

        console.log("✅ Sucesso! Salvando imagem de resposta...");

        // O servidor devolve "data:image/png;base64,....."
        // Vamos limpar o prefixo para salvar no disco
        const base64Data = data.imageUrl.replace(/^data:image\/\w+;base64,/, "");
        
        fs.writeFileSync('resultado_final.png', base64Data, 'base64');
        console.log("✨ Imagem salva como 'resultado_final.png'. Abra para conferir!");

    } catch (error) {
        console.error("\n❌ ERRO DETALHADO:");
        console.error("Mensagem:", error.message);
        if (error.cause) {
            console.error("Causa raiz:", error.cause);
        }
        
        // Dicas baseadas no erro
        if (error.cause && error.cause.code === 'ECONNREFUSED') {
            console.log("\n💡 DICA: O servidor não está rodando ou não está na porta 3000.");
            console.log("   Verifique se rodou 'node server.js' em outra janela.");
        }
        if (error.cause && error.cause.code === 'EPIPE') {
             console.log("\n💡 DICA: O servidor fechou a conexão antes de receber os dados.");
             console.log("   Provavelmente o JSON é maior que o limite configurado no Express.");
        }
    }
}
testarGeracao();