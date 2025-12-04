const path = require('path');
const ImageModel = require('../models/ImageModel');

class ImageController {
  static async createImage(req, res) {
    try {
      const { filename } = req.file;
      const filePath = path.join('uploads', filename);

      const id = await ImageModel.createImage(filename, filePath);
      res.status(201).json({ id, message: 'Imagem enviada com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao salvar a imagem.' });
    }
  }

  static async getAllImages(req, res) {
    try {
      const images = await ImageModel.getAllImages();
      res.status(200).json(images);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar imagens.' });
    }
  }

  static async getImageById(req, res) {
    try {
      const { id } = req.params;
      const image = await ImageModel.getImageById(id);

      if (!image) {
        return res.status(404).json({ message: 'Imagem não encontrada.' });
      }

      res.status(200).json(image);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar a imagem.' });
    }
  }

  static async updateImage(req, res) {
    try {
      const { id } = req.params;
      const { filename, path } = req.body;

      const updated = await ImageModel.updateImage(id, { filename, path });

      if (!updated) {
        return res.status(404).json({ message: 'Imagem não encontrada.' });
      }

      res.status(200).json({ message: 'Imagem atualizada com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao atualizar a imagem.' });
    }
  }

  static async deleteImage(req, res) {
    try {
      const { id } = req.params;

      const deleted = await ImageModel.deleteImage(id);

      if (!deleted) {
        return res.status(404).json({ message: 'Imagem não encontrada.' });
      }

      res.status(200).json({ message: 'Imagem deletada com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao deletar a imagem.' });
    }
  }
}

module.exports = ImageController;
