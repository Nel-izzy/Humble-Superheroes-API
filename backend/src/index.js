import express from 'express';
import cors from 'cors';
import superheroRoutes from './routes/superhero.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/superheroes', superheroRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
