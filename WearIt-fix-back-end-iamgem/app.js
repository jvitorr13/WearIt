const db = require('../db');
const cors = require('cors');

class ImageModel {
  static async createImage(filename, path) {
    const [id] = await db('images').insert({ filename, path }).returning('id');
    return id;
  }

  static async getAllImages() {
    return db('images').select('*');
  }

  static async getImageById(id) {
    return db('images').where({ id }).first();
  }

  static async updateImage(id, data) {
    return db('images').where({ id }).update(data);
  }

  static async deleteImage(id) {
    return db('images').where({ id }).del();
  }
}

module.exports = ImageModel;