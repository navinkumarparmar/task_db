const { body, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');

exports.validateTask = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').customSanitizer(value => sanitizeHtml(value)), 
  body('priority').isIn(['Low', 'Medium', 'High']).withMessage('Invalid priority'),
  body('dueDate').isISO8601().withMessage('Invalid date format'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
