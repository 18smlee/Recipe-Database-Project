const express = require('express');
const mysql = require('mysql');


const routes = require('./routes')
const config = require('./config.json')
const cors = require('cors');


const app = express();
app.use(cors({
    origin: '*'
}));

// Route 1 - register as GET 
app.get('/hello', routes.hello)

// Route 2 - register as GET 
app.get('/jersey/:choice', routes.jersey)

// Route 3 - register as GET 
app.get('/matches/:league', routes.all_matches)

// Route 4 - register as GET 
app.get('/players', routes.all_players)

// Route 5 - register as GET 
app.get('/match', routes.match)

// Route 6 - register as GET 
app.get('/player', routes.player)

// Route 7 - register as GET 
app.get('/search/matches', routes.search_matches)

// Route 8 - register as GET 
app.get('/search/players', routes.search_players)

// PROJECT ROUTES

// Route 1
app.get('/search/recipes/traits', routes.search_recipes_by_traits)

// Route 2
app.get('/search/recipes/reviews', routes.search_recipes_by_review)

// Route 3
app.get('/dailymealplanner', routes.search_recipes_by_ingredients)

// Route 4
app.get('/search/chopped/episode', routes.search_chopped_by_episode)

// Route 5
app.get('/search/chopped/ingredients', routes.search_chopped_by_ingredients)

// Route 6
app.get('/chopped/similarrecipes', routes.find_recipes_by_chopped)

// Route 7
app.get('/recipes/choppedlikelihood', routes.find_chopped_likelihood)

// Route 8
app.get('/search/recipes/ingredients', routes.search_recipes_by_ingredients)

// Route 9
app.get('/search/users/review', routes.search_users_by_reviews)

// Route 10
app.get('/recipes/:userId', routes.get_all_recipes_from_user)

// Route 11
app.get('/reviews/:userId', routes.get_all_reviews_from_user)

// EXTRA ROUTES
app.get('/recipes', routes.get_all_recipes)

app.get('/chopped', routes.get_all_chopped)

app.get('/users', routes.get_all_users)

app.get('/recipe/:recipeId', routes.get_recipe_by_id)









app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;