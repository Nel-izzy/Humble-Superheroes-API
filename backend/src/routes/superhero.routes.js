import express from 'express';
import { addSuperhero, getSuperheroes } from '../controllers/superhero.controller.js';
import { validateSuperhero } from '../middlewares/validation.middleware.js';

const router = express.Router();

router.post('/', validateSuperhero, addSuperhero);
router.get('/', getSuperheroes);

export default router;
