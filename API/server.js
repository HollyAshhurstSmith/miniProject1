const express = require('express');
const cors = require('cors'); 
const recipeRouter = require('./routes/recipeRoutes');

const app = express();
const PORT = 3000;

app.use(cors()); // cross origin resource sharing
app.use(express.json());

app.use('/recipes', recipeRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// back-end set up so it runs