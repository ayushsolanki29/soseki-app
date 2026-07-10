// src/modules/demo/demo.routes.js
const express = require('express');
const router = express.Router();
const demoController = require('./demo.controller');
const demoValidation = require('./demo.validation');
const validate = require('../../middleware/validate.middleware');
const upload = require('../../middleware/upload.middleware');

// Demo CRUD routes
router.post('/', validate(demoValidation.createDemoValidation), demoController.createDemo);
router.get('/', demoController.getAllDemos);
router.get('/:id', demoController.getDemoById);
router.put('/:id', validate(demoValidation.updateDemoValidation), demoController.updateDemo);
router.delete('/:id', demoController.deleteDemo);

// File upload routes
router.post('/upload', upload.single('file'), demoController.uploadFile);
router.get('/files/all', demoController.getUserFiles);
router.delete('/files/:fileId', demoController.deleteFile);

module.exports = router;