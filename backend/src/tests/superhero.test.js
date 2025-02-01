import request from 'supertest';
import express from 'express';
import superheroRoutes from '../routes/superhero.routes.js';

const app = express();
app.use(express.json());
app.use('/superheroes', superheroRoutes);

describe('Superhero API', () => {
    it('should add a new superhero', async () => {
        const res = await request(app).post('/superheroes').send({
            name: 'Spider-Man',
            superpower: 'Wall-crawling',
            humilityScore: 9,
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toBe('Superhero added!');
    });
});

export default app;