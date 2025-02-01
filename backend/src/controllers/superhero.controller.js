import { superheroService } from '../services/superhero.service.js';

export const addSuperhero = (req, res) => {
    const { name, superpower, humilityScore } = req.body;
    const superhero = superheroService.addSuperhero(name, superpower, humilityScore);
    res.status(201).json({ message: 'Superhero added!', superhero });
};

export const getSuperheroes = (req, res) => {
    const sortedHeroes = superheroService.getSuperheroes();
    res.status(200).json(sortedHeroes);
};