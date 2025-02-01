import { body, validationResult } from 'express-validator';

export const validateSuperhero = [
    body('name').notEmpty().withMessage('Name is required'),
    body('superpower').notEmpty().withMessage('Superpower is required'),
    body('humilityScore')
        .isInt({ min: 1, max: 10 })
        .withMessage('Humility score must be a number between 1 and 10'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];