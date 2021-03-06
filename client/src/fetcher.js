import config from './config.json'

const getAllMatches = async (page, pagesize, league) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/matches/${league}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getAllPlayers = async (page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/players?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getMatch = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/match?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getPlayer = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/player?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getMatchSearch = async (home, away, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/matches?Home=${home}&Away=${away}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getPlayerSearch = async (name, nationality, club, rating_high, rating_low, pot_high, pot_low, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/players?Name=${name}&Nationality=${nationality}&Club=${club}&RatingLow=${rating_low}&RatingHigh=${rating_high}&PotentialHigh=${pot_high}&PotentialLow=${pot_low}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

// PROJECT //

const getRecipeFromTraitSearch = async (name, min_time_to_cook, max_time_to_cook, min_num_steps, max_num_steps, min_avg_rating, max_avg_rating, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/recipes/traits?Name=${name}&MinTimeToCook=${min_time_to_cook}&MaxTimeToCook=${max_time_to_cook}&MinNumSteps=${min_num_steps}&MaxNumSteps=${max_num_steps}&MinAvgRating=${min_avg_rating}&MaxAvgRating=${max_avg_rating}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

// not using this because combined it with the trait search
const getRecipeFromReviewSearch = async (avg_rating, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/recipes/reviews?AvgRating=${avg_rating}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getDailyMealPlanner = async (max_calories, max_sugar, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/dailymealplanner?Calories=${max_calories}&Sugar=${max_sugar}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getChoppedFromEpisodeSearch = async (judge1_name, judge2_name, judge3_name, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/chopped/episode?Judge1=${judge1_name}&Judge2=${judge2_name}&Judge3=${judge3_name}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}
const getChoppedFromIngredientSearch = async (ingredient1, ingredient2, ingredient3, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/chopped/ingredients?Ingredient1=${ingredient1}&Ingredient2=${ingredient2}&Ingredient3=${ingredient3}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}
const getChoppedSimilarRecipes = async (episode_num, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/chopped/similarrecipes?EpisodeNum=${episode_num}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}
const getRecipeChoppedLikelihood = async (recipe_id, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/recipes/choppedlikelihood?RecipeId=${recipe_id}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}
const getRecipeFromIngredientSearch = async (ingredient1, ingredient2, ingredient3, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/recipes/ingredients?Ingredient1=${ingredient1}&Ingredient2=${ingredient2}&Ingredient3=${ingredient3}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}
const getUserFromReviewSearch = async (num_recipes, num_reviews, avg_rating_received, avg_rating_given, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/users/review?NumRecipes=${num_recipes}&NumReviews=${num_reviews}&AvgRatingReceived=${avg_rating_received}&AvgRatingGiven=${avg_rating_given}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}
const getAllUsersRecipes = async (user_id, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/recipes/${user_id}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}
const getAllUsersReviews = async (user_id, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/reviews/${user_id}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}
const getAllRecipes = async (page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/recipes?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}
const getAllChopped = async (page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/chopped?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}
const getAllUsers = async (page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/users?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}
const getUser = async (user_id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/users/${user_id}`, {
        method: 'GET',
    })
    return res.json()
}
const getRecipe = async (recipe_id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/recipedetails?recipeId=${recipe_id}`, {
        method: 'GET',
    })
    return res.json()
}

const getChoppedEpisodeIngredients = async (episode_num) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/chopped/ingredients?EpisodeNum=${episode_num}`, {
        method: 'GET',
    })
    return res.json()
}

const getRecipeFromNameSearch = async (name, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/recipes/name?RecipeName=${name}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getRecipeIngredients = async (recipe_id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/recipe/ingredients?RecipeId=${recipe_id}`, {
        method: 'GET',
    })
    return res.json()
}

const findSimilarRecipe = async (recipeId, max_calories, max_sugar, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/findsimilarrecipe?RecipeId=${recipeId}&Calories=${max_calories}&Sugar=${max_sugar}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}



export {
    getAllMatches,
    getAllPlayers,
    getMatch,
    getPlayer,
    getMatchSearch,
    getPlayerSearch,
    getRecipeFromTraitSearch,
    getRecipeFromReviewSearch,
    getDailyMealPlanner,
    getChoppedFromEpisodeSearch,
    getChoppedFromIngredientSearch,
    getChoppedSimilarRecipes,
    getRecipeChoppedLikelihood,
    getRecipeFromIngredientSearch,
    getUserFromReviewSearch,
    getAllUsersRecipes,
    getAllUsersReviews,
    getAllRecipes,
    getAllChopped,
    getAllUsers,
    getRecipe,
    getUser,
    getChoppedEpisodeIngredients,
    getRecipeFromNameSearch,
    getRecipeIngredients,
    findSimilarRecipe
}