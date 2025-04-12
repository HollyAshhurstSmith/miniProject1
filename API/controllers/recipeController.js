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

// exported to functions so they can be shared. Logic side


export function getAllRecipes(req, res) {
    res.status(200).json(recipes);
}

export function getRecipeById(req, res) {
    const id = parseInt(req.params.id);
    const recipe = recipes.find(r => r.id === id);

    // receive recipe (by specific id)
    if (recipe) {
        res.status(200).json(recipe);
    // If a resource does exist return a 404 (Not found) status code  
    } else {
        res.status(404).json({ message: 'Recipe not found' });
    }
}

export function createRecipe(req, res) {
    const newRecipe = {
        id: recipes.length + 1,
        ...req.body
    };
    recipes.push(newRecipe);
    res.status(201).json(newRecipe);  //adding new recipe with new identifier
}

export function updateRecipe(req, res) {
    const id = parseInt(req.params.id);
    const index = recipes.findIndex(r => r.id === id);
    
    // Create or update a resource
    recipes[index] = { id, ...req.body };
    // If a resource does not exist return a 201 (Created) status code
    if (index === -1) {
        res.status(201);
    // If a resource does exist return a 204 (No-Content) status code
    } else {
        res.status(204);
    }
    console.log(recipes[index])
}

export function deleteRecipe(req, res) {
    const id = parseInt(req.params.id);
    const index = recipes.findIndex(r => r.id === id);
    console.log(recipes[index])
    // delete recipe
    if (index !== -1) {
        const deleted = recipes.splice(index, 1);
        res.status(200).json(deleted[0]);

    // If a resource does exist return a 404 (Not found) status code 
    } else {
        res.status(404).json({ message: 'Recipe not found' });
    }
}



