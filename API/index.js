const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors'); 

app.use(cors());
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

let recipes = [
    {
        id: 1,
        title: 'Hot Milo',
        ingredients: ['Milo Powder', 'Hot Milk'],
        prepTime: '2 mins'
    },
    {
        id: 2,
        title: 'Peanut Butter Sandwich',
        ingredients: ['Peanut Butter', 'Bread'],
        prepTime: '3 mins'
    }
];

app.get('/recipes', (req, res) => {
    res.status(200).json(recipes);
});

app.get('/recipes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const recipe = recipes.find(r => r.id === id);
    
    if (recipe) {
        res.status(200).json(recipe);
    } else {
        res.status(404).json({ message: 'Recipe not found' });
    }
});

app.post('/recipes', (req, res) => {
    const newRecipe = {
        id: recipes.length + 1, // not ideal for production but fine here
        ...req.body
    };
    recipes.push(newRecipe);
    res.status(201).json(newRecipe);
});

app.put('/recipes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = recipes.findIndex(r => r.id === id);
    
    if (index !== -1) {
        recipes[index] = { id, ...req.body };
        res.status(200).json(recipes[index]);
    } else {
        res.status(404).json({ message: 'Recipe not found' });
    }
});

app.delete('/recipes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = recipes.findIndex(r => r.id === id);

    if (index !== -1) {
        const deleted = recipes.splice(index, 1);
        res.status(200).json(deleted[0]);
    } else {
        res.status(404).json({ message: 'Recipe not found' });
    }
});



