var express = require('express');
var router = express.Router();
module.exports = router;
const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');
const { read } = require('fs');

router.get('/', (req, res, next) => {
  Message.find()
  .populate('sender')
    .then((messages) => {
      res.status(200).json({
        message: 'Messages fetched successfully!',
        messages: messages,
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
  const maxMessageId = sequenceGenerator.nextId('messages');

  const message = new Message({
    id: maxMessageId,
    name: req.body.subject,
    description: req.body.msgText,
    url: req.body.sender,
  });

  message
    .save()
    .then((createdMessage) => {
      res.status(201).json({
        response: 'Message added successfully',
        newMessage: createdMessage,
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
    .then((message) => {
      message.subject = req.body.subject,
      message.msgText = req.body.msgText,
      message.sender = req.body.sender,

      Message.updateOne({ id: req.params.id }, message)
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
        error: { message: 'Message not found' },
      });
    });
});

router.delete('/:id', (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then((message) => {
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
        error: { message: 'Message not found' },
      });
    });
});
