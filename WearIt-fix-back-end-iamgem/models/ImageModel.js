const db = require('../db');

class ImageModel {
  // Cria uma nova imagem no banco de dados
  static async createImage(filename, path) {
    const [id] = await db('images').insert({ filename, path }).returning('id');
    return id;
  }

  // Retorna todas as imagens
  static async getAllImages() {
    return db('images').select('*');
  }

  // Retorna uma imagem pelo ID
  static async getImageById(id) {
    return db('images').where({ id }).first();
  }

  // Atualiza os dados de uma imagem pelo ID
  static async updateImage(id, data) {
    return db('images').where({ id }).update(data);
  }

  // Deleta uma imagem pelo ID
  static async deleteImage(id) {
    return db('images').where({ id }).del();
  }
}

module.exports = ImageModel;