var express = require('express');
var router = express.Router();
module.exports = router;
const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/contact');
const { read } = require('fs');

router.get('/', (req, res, next) => {
  Message.find()
    .populate('group')
    .then((contacts) => {
      res.status(200).json({
        message: 'Messages fetched successfully!',
        contacts: contacts,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'An error occurred',
        error: error,
      });
    });
});

router.post('/', (req, res, next) => {
  const maxMessageId = sequenceGenerator.nextId('contacts');

  const contact = new Message({
    id: maxMessageId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
  });

  contact
    .save()
    .then((createdMessage) => {
      res.status(201).json({
        message: 'Message added successfully',
        contact: createdMessage,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'An error occurred',
        error: error,
      });
    });
});

router.put('/:id', (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then((contact) => {
      contact.name = req.body.name;
      contact.description = req.body.description;
      contact.url = req.body.url;

      Message.updateOne({ id: req.params.id }, contact)
        .then((res) => {
          res.status(204).json({
            message: 'Message updated successfully',
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: 'An error occurred',
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Message not found.',
        error: { contact: 'Message not found' },
      });
    });
});

router.delete('/:id', (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then((contact) => {
      Message.deleteOne({ id: req.params.id })
        .then((res) => {
          res.status(204).json({
            message: 'Message deleted successfully',
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: 'An error occurred',
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Message not found.',
        error: { contact: 'Message not found' },
      });
    });
});
