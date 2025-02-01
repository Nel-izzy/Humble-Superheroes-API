import { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Card, CardContent, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = 'http://localhost:5000/api/superheroes';

function App() {
  const [name, setName] = useState('');
  const [superpower, setSuperpower] = useState('');
  const [humilityScore, setHumilityScore] = useState('');
  const [superheroes, setSuperheroes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchSuperheroes();
  }, []);

  const fetchSuperheroes = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(API_URL);
      setSuperheroes(data);
    } catch (error) {
      console.error('Error fetching superheroes:', error);
    } finally {
      setLoading(false);
    }
  };

  const addSuperhero = async () => {
    if (!name || !superpower || !humilityScore) {
      toast.error('All fields are required!');
      return;
    }
    try {
      await axios.post(API_URL, { name, superpower, humilityScore: Number(humilityScore) });
      toast.success('Superhero added successfully!');
      fetchSuperheroes();
      setName('');
      setSuperpower('');
      setHumilityScore('');
    } catch (error) {
      toast.error('Error adding superhero');
      console.error('Error adding superhero:', error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <Typography variant="h4" align="center" gutterBottom>Humble Superhero Registry</Typography>
      <TextField fullWidth label="Search" value={search} onChange={(e) => setSearch(e.target.value)} margin="normal" />
      <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} margin="normal" />
      <TextField fullWidth label="Superpower" value={superpower} onChange={(e) => setSuperpower(e.target.value)} margin="normal" />
      <TextField fullWidth label="Humility Score (1-10)" type="number" value={humilityScore} onChange={(e) => setHumilityScore(e.target.value)} margin="normal" />
      <Button variant="contained" color="primary" fullWidth onClick={addSuperhero} style={{ marginTop: '1rem' }}>Add Superhero</Button>
      <Typography variant="h5" style={{ marginTop: '2rem' }}>Superheroes</Typography>
      {loading ? <CircularProgress style={{ display: 'block', margin: '1rem auto' }} /> : (
        <Grid container spacing={2} style={{ marginTop: '1rem' }}>
          {superheroes.filter(hero => hero.name.toLowerCase().includes(search.toLowerCase())).map((hero, index) => (
            <Grid item xs={12} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{hero.name}</Typography>
                  <Typography color="textSecondary">{hero.superpower}</Typography>
                  <Typography variant="subtitle2">Humility Score: {hero.humilityScore}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default App;
