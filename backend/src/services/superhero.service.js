class SuperheroService {
    constructor() {
        this.superheroes = [];
    }

    addSuperhero(name, superpower, humilityScore) {
        const superhero = { name, superpower, humilityScore };
        this.superheroes.push(superhero);
        return superhero;
    }

    getSuperheroes() {
        return this.superheroes.sort((a, b) => b.humilityScore - a.humilityScore);
    }
}

export const superheroService = new SuperheroService();