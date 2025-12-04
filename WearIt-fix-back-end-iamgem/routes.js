const express = require('express');
const multer = require('multer');
const ImageController = require('./controllers/ImageController');

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/images', upload.single('image'), ImageController.createImage);
router.get('/images', ImageController.getAllImages);
router.get('/images/:id', ImageController.getImageById);
router.put('/images/:id', ImageController.updateImage);
router.delete('/images/:id', ImageController.deleteImage);

module.exports = router;
