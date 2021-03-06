const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();

// ********************************************
//            SIMPLE ROUTE EXAMPLE
// ********************************************

// Route 1 (handler)
async function hello(req, res) {
    // a GET request to /hello?name=Steve
    if (req.query.name) {
        res.send(`Hello, ${req.query.name}! Welcome to the Food server!`)
    } else {
        res.send(`Hello! Welcome to the Food server!`)
    }
}


// ********************************************
//                  WARM UP 
// ********************************************

// Route 2 (handler)
async function jersey(req, res) {
    const colors = ['red', 'blue']
    const jersey_number = Math.floor(Math.random() * 20) + 1
    const name = req.query.name ? req.query.name : "player"

    if (req.params.choice === 'number') {
        // TODO: TASK 1: inspect for issues and correct 
        res.json({ message: `Hello, ${name}!`, jersey_number: jersey_number })
    } else if (req.params.choice === 'color') {
        var color_index = 0;
        var rand = Math.random();
        if (rand < 0.5) {
            color_index = 1;
        }
        // TODO: TASK 2: change this or any variables above to return only 'red' or 'blue' at random (go Quakers!)
        res.json({ message: `Hello, ${name}!`, jersey_color: colors[color_index] })
    } else {
        // TODO: TASK 3: inspect for issues and correct
        res.json({ message: `Hello, ${name}, we like your jersey!` })
    }
}

// ********************************************
//               GENERAL ROUTES
// ********************************************


// Route 3 (handler)
async function all_matches(req, res) {
    // TODO: TASK 4: implement and test, potentially writing your own (ungraded) tests
    // We have partially implemented this function for you to 
    // parse in the league encoding - this is how you would use the ternary operator to set a variable to a default value
    // we didn't specify this default value for league, and you could change it if you want! 
    // in reality, league will never be undefined since URLs will need to match matches/:league for the request to be routed here... 
    const league = req.params.league ? req.params.league : 'D1'
    const pageSize = req.query.pagesize ? req.query.pagesize : 10;

    var matchQuery = `SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals  
    FROM Matches 
    WHERE Division = '${league}'
    ORDER BY HomeTeam, AwayTeam`

    if (req.query.page && !isNaN(req.query.page)) {
        // This is the case where page is defined.
        // The SQL schema has the attribute OverallRating, but modify it to match spec! 
        // TODO: query and return results here:
        matchQuery = `SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals  
        FROM Matches 
        WHERE Division = '${league}'
        ORDER BY HomeTeam, AwayTeam
        LIMIT ${pageSize} OFFSET ${pageSize * req.query.page}`
    }
    connection.query(matchQuery, function (error, results, fields) {

        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

// Route 4 (handler)
async function all_players(req, res) {
    // TODO: TASK 5: implement and test, potentially writing your own (ungraded) tests
    const pageSize = req.query.pagesize ? req.query.pagesize : 10;
    
    var playerQuery = `SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, Club, Value
    FROM Players
    ORDER BY Name`

    if (req.query.page && !isNaN(req.query.page)) {
        playerQuery = `SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, Club, Value
        FROM Players
        ORDER BY Name
        LIMIT ${pageSize} OFFSET ${pageSize * req.query.page}`
    }
    connection.query(playerQuery, function (error, results, fields) {

        if (error) {
            console.log(error)
        } else if (results) {
            res.json({ results: results })
        }
    });
}

// ********************************************
//             MATCH-SPECIFIC ROUTES
// ********************************************

// Route 5 (handler)
async function match(req, res) {
    // TODO: TASK 6: implement and test, potentially writing your own (ungraded) tests
    var matchQuery = `SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals,
    HalfTimeGoalsH AS HTHomeGoals, HalfTimeGoalsA AS HTAwayGoals, ShotsH AS ShotsHome, ShotsA AS ShotsAway, ShotsOnTargetH AS ShotsOnTargetHome,
    ShotsOnTargetA AS ShotsOnTargetAway, FoulsH AS FoulsHome, FoulsA AS FoulsAway, CornersH AS CornersHome, CornersA AS CornersAway,
    YellowCardsH AS YCHome, YellowCardsA AS YCAway, RedCardsH AS RCHome, RedCardsA AS RCAway
    FROM Matches
    WHERE MatchId = ${req.query.id}`

    connection.query(matchQuery, function (error, results, fields) {

        if (error) {
            res.json({ results: [] })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

// ********************************************
//            PLAYER-SPECIFIC ROUTES
// ********************************************

// Route 6 (handler)
async function player(req, res) {
    // TODO: TASK 7: implement and test, potentially writing your own (ungraded) tests
    bestPositionQuery = `SELECT BestPosition
    FROM Players
    WHERE PlayerId = ${req.query.id}`
    gkQuery = `SELECT PlayerId, Name, Age, Photo, Nationality, Flag, OverallRating AS Rating, Potential, Club, ClubLogo, Value, Wage, InternationalReputation,
    Skill, JerseyNumber, ContractValidUntil, Height, Weight, BestPosition, BestOverallRating, ReleaseClause, GKPenalties, GKDiving, GKHandling,
    GKKicking, GKPositioning, GKReflexes
    FROM Players
    WHERE PlayerId = ${req.query.id}`
    regQuery = `SELECT PlayerId, Name, Age, Photo, Nationality, Flag, OverallRating AS Rating, Potential, Club, ClubLogo, Value, Wage, InternationalReputation,
    Skill, JerseyNumber, ContractValidUntil, Height, Weight, BestPosition, BestOverallRating, ReleaseClause, NPassing, NBallControl, NAdjustedAgility,
    NStamina, NStrength, NPositioning
    FROM Players
    WHERE PlayerId = ${req.query.id}`

    connection.query(bestPositionQuery, function (error, results, fields) {

        if (error) {
            res.json({ results: [] })
        } else if (results[0].BestPosition == "GK") {
            connection.query(gkQuery, function (error, results, fields) {
                if (error) {
                    res.json({ results: [] })
                } else if (results) {
                    res.json({ results: results })
                }
            });
        } else {
            connection.query(regQuery, function (error, results, fields) {
                if (error) {
                    res.json({ results: [] })
                } else if (results) {
                    res.json({ results: results })
                }
            });
        }
    });
}


// ********************************************
//             SEARCH ROUTES
// ********************************************

// Route 7 (handler)
async function search_matches(req, res) {
    // TODO: TASK 8: implement and test, potentially writing your own (ungraded) tests
    // IMPORTANT: in your SQL LIKE matching, use the %query% format to match the search query to substrings, not just the entire string
    const pageSize = req.query.pagesize ? req.query.pagesize : 10;
    const home = req.query.Home ? req.query.Home : '';
    const away = req.query.Away ? req.query.Away : '';

    matchSearchQuery = `SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals
    FROM Matches
    WHERE HomeTeam LIKE '%${home}%' AND AwayTeam LIKE '%${away}%'
    ORDER BY HomeTeam, AwayTeam
    `
    if (req.query.page && !isNaN(req.query.page)) {
        matchSearchQuery = `SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals
        FROM Matches
        WHERE HomeTeam LIKE '%${home}%' AND AwayTeam LIKE '%${away}%'
        ORDER BY HomeTeam, AwayTeam
        LIMIT ${pageSize} OFFSET ${pageSize * req.query.page}
        `
    }
    connection.query(matchSearchQuery, function (error, results, fields) {
        if (error) {
            res.json({ results: [] })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

// Route 8 (handler)
async function search_players(req, res) {
    // TODO: TASK 9: implement and test, potentially writing your own (ungraded) tests
    // IMPORTANT: in your SQL LIKE matching, use the %query% format to match the search query to substrings, not just the entire string
    const pageSize = req.query.pagesize ? req.query.pagesize : 10;
    const name = req.query.Name ? req.query.Name : '';
    const nationality = req.query.Nationality ? req.query.Nationality : '';
    const club = req.query.Club ? req.query.Club : '';
    
    const ratingLow = req.query.RatingLow ? req.query.RatingLow : 0;
    const ratingHigh = req.query.RatingHigh ? req.query.RatingHigh : 100;
    const potentialLow = req.query.PotentialLow ? req.query.PotentialLow : 0;
    const potentialHigh = req.query.PotentialHigh ? req.query.PotentialHigh : 100;

    playerSearchQuery = `SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, Club, Value
    FROM Players
    WHERE Name LIKE '%${name}%' AND Nationality LIKE '%${nationality}%' AND Club LIKE '%${club}%' AND OverallRating >= ${ratingLow} AND OverallRating <= ${ratingHigh} AND Potential >= ${potentialLow} AND Potential <= ${potentialHigh}
    ORDER BY Name
    `
    if (req.query.page && !isNaN(req.query.page)) {
        playerSearchQuery = `SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, Club, Value
        FROM Players
        WHERE Name LIKE '%${name}%' AND Nationality LIKE '%${nationality}%' AND Club LIKE '%${club}%' AND OverallRating >= ${ratingLow} AND OverallRating <= ${ratingHigh} AND Potential >= ${potentialLow} AND Potential <= ${potentialHigh}
        ORDER BY Name
        LIMIT ${pageSize} OFFSET ${pageSize * req.query.page}
        `
    }
    connection.query(playerSearchQuery, function (error, results, fields) {
        if (error) {
            res.json({ results: [] })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

// PROJECT ROUTES

// Route 1
// allows us to search based on name and a number of traits
async function search_recipes_by_traits(req, res) {
    const recipe_name = req.query.Name ? req.query.Name : '';
    const min_cook_time = req.query.MinTimeToCook ? req.query.MinTimeToCook : 0;
    const max_cook_time = req.query.MaxTimeToCook ? req.query.MaxTimeToCook : 160;
    const min_num_steps = req.query.MinNumSteps ? req.query.MinNumSteps : 0;
    const max_num_steps = req.query.MaxNumSteps ? req.query.MaxNumSteps : 9999999;
    const min_avg_rating = req.query.MinAvgRating ? req.query.MinAvgRating : 0;
    const max_avg_rating = req.query.MaxAvgRating ? req.query.MaxAvgRating : 5;
    const pageSize = req.query.pagesize ? req.query.pagesize : 10;
    // is searching by review a different route?? or should it be combined?
    // Update: combined them
    
    recipeSearchQuery = `SELECT *
    FROM Recipe
    WHERE name LIKE '% ${recipe_name} %'
    AND minutes BETWEEN ${min_cook_time} AND ${max_cook_time}
    AND n_steps BETWEEN ${min_num_steps} AND ${max_num_steps}
    AND ((avg_rating >= ${min_avg_rating}
        AND avg_rating <= ${max_avg_rating})
        OR avg_rating IS NULL);`
    if (req.query.page && !isNaN(req.query.page)) {
        recipeSearchQuery = 
        `SELECT *
        FROM Recipe
        WHERE name LIKE '%${recipe_name}%'
        AND minutes >= ${min_cook_time}
        AND minutes <= ${max_cook_time}
        AND n_steps >= ${min_num_steps}
        AND n_steps <= ${max_num_steps}
        AND ((avg_rating >= ${min_avg_rating}
            AND avg_rating <= ${max_avg_rating})
            OR avg_rating IS NULL)
        LIMIT ${pageSize} OFFSET ${pageSize * req.query.page}
        ;`
    }
    console.log(recipeSearchQuery)

    connection.query(recipeSearchQuery, function (error, results, fields) {
        if (error) {
            res.json({ results: [] })
        } else if (results) {
            // console.log(results)
            res.json({ results: results })
            // console.log("got to the route")
            // console.log(results.length)
        }
    });
}

// Route 2 -- currently done in route 1, should it be separate? 
// Update: added it to route 1
async function search_recipes_by_review(req, res) {
    const pageSize = req.query.pagesize ? req.query.pagesize : 10;
    recipeSearchQuery = ``
    connection.query(recipeSearchQuery, function (error, results, fields) {
        if (error) {
            res.json({ results: [] })
        } else if (results) {
            res.json({ results: results })
        } 
    });
}

// Route 3 (Mealmaker)
// creates 3 plans for individuals based on calorie counts and sugar levels
async function search_recipes_by_nutrition(req, res) {
    const pageSize = req.query.pagesize ? req.query.pagesize : 10;
    const num_calories = req.query.Calories ? req.query.Calories : 2400;
    const max_sugar = req.query.Sugar ? req.query.Sugar : 300;
    console.log("calories")
    console.log(req.query.Calories)
    recipeSearchQuery = `SELECT recipe1_id, recipe1_name, recipe2_id, recipe2_name, rec3.id AS recipe3_id, rec3.name AS recipe3_name, total_calories + rec3.num_calories AS total_calories, total_sugar + rec3.sugar AS total_sugar, rec2sugar, rec2cals
        FROM
        (SELECT rec1.id AS recipe1_id, rec1.name AS recipe1_name, rec2.id AS recipe2_id, rec2.name AS recipe2_name, rec1.num_calories + rec2.num_calories AS total_calories, rec1.sugar + rec2.sugar AS total_sugar, rec2.sugar AS rec2sugar, rec2.num_calories AS rec2cals
        FROM Recipe rec1
        JOIN Recipe rec2 ON (rec1.num_calories + rec2.num_calories < ${num_calories} AND rec1.sugar + rec2.sugar < ${max_sugar})
        WHERE rec1.id != rec2.id) agg
        JOIN Recipe rec3 ON ((total_calories + rec3.num_calories BETWEEN (${num_calories} - 5) AND (${num_calories} + 5)) AND (total_sugar + rec3.sugar BETWEEN (${max_sugar} - 5) AND (${max_sugar} + 5)))
        WHERE recipe1_id != rec3.id AND recipe2_id != rec3.id
        LIMIT 3`;

    console.log(recipeSearchQuery)

    // if (req.query.page && !isNaN(req.query.page)) {
    //     recipeSearchQuery = `SELECT recipe1_id, recipe2_id, rec3.id AS recipe3_id, total_calories + rec3.num_calories AS total_calories
    //     FROM
    //     (SELECT rec1.id AS recipe1_id, rec2.id AS recipe2_id, rec1.num_calories + rec2.num_calories AS total_calories
    //     FROM Recipe rec1
    //     JOIN Recipe rec2 ON rec1.num_calories + rec2.num_calories < ${num_calories}
    //     WHERE rec1.id != rec2.id) agg
    //     JOIN Recipe rec3 ON total_calories + rec3.num_calories BETWEEN ${num_calories - 5} AND ${num_calories + 5}
    //     WHERE recipe1_id != rec3.id AND recipe2_id != rec3.id
    //     LIMIT ${pageSize} OFFSET ${pageSize * req.query.page};`
    // }

    connection.query(recipeSearchQuery, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ results: [] })
        } else if (results) {
            console.log(results)
            res.json({ results: results })
        }
    });
}

// Route 4 
// search chopped by judges
async function search_chopped_by_episode(req, res) {
    const pageSize = req.query.pagesize ? req.query.pagesize : 10;
    const judge1Name = req.query.Judge1 ? req.query.Judge1 : '';
    const judge2Name = req.query.Judge2 ? req.query.Judge2 : '';
    const judge3Name = req.query.Judge3 ? req.query.Judge3 : '';

    choppedSearchQuery = `SELECT *
        FROM ChoppedEpisode
        WHERE (Judge1 LIKE '%${judge1Name}%' OR Judge2 LIKE '%${judge1Name}%' OR Judge3 LIKE '%${judge1Name}%')
            AND (Judge1 LIKE '%${judge2Name}%' OR Judge2 LIKE '%${judge2Name}%' OR Judge3 LIKE '%${judge2Name}%')
            AND (Judge1 LIKE '%${judge3Name}%' OR Judge2 LIKE '%${judge3Name}%' OR Judge3 LIKE '%${judge3Name}%')
            ;`

        if (req.query.page && !isNaN(req.query.page)) {
            choppedSearchQuery = `SELECT *
            FROM ChoppedEpisode
            WHERE (Judge1 LIKE '%${judge1Name}%' OR Judge2 LIKE '%${judge1Name}%' OR Judge3 LIKE '%${judge1Name}%')
            AND (Judge1 LIKE '%${judge2Name}%' OR Judge2 LIKE '%${judge2Name}%' OR Judge3 LIKE '%${judge2Name}%')
            AND (Judge1 LIKE '%${judge3Name}%' OR Judge2 LIKE '%${judge3Name}%' OR Judge3 LIKE '%${judge3Name}%')
            LIMIT ${pageSize} OFFSET ${pageSize * req.query.page};`
        }

    connection.query(choppedSearchQuery, function (error, results, fields) {
        if (error) {
            res.json({ results: [] })
        } else if (results) {
            console.log(results.length)
            res.json({ results: results })
        }
    });
    console.log(choppedSearchQuery)
}

// Route 5
async function search_chopped_by_ingredients(req, res) {
    const pageSize = req.query.pagesize ? req.query.pagesize : 10;
    const ingredient1Name = req.query.Ingredient1 ? req.query.Ingredient1 : '';
    const ingredient2Name = req.query.Ingredient2 ? req.query.Ingredient2 : '';
    const ingredient3Name = req.query.Ingredient3 ? req.query.Ingredient3 : '';

    choppedSearchQuery = `SELECT *
    FROM ChoppedEpisode
    WHERE (LOWER(episode_name) LIKE '%${ingredient1Name}%'
        AND LOWER(episode_name) LIKE '%${ingredient2Name}%'
        AND LOWER(episode_name) LIKE '%${ingredient3Name}%');`

    if (req.query.page && !isNaN(req.query.page)) {
        choppedSearchQuery = `SELECT *
        FROM ChoppedEpisode
        WHERE (LOWER(episode_name) LIKE '%${ingredient1Name}%'
            AND LOWER(episode_name) LIKE '%${ingredient2Name}%'
            AND LOWER(episode_name) LIKE '%${ingredient3Name}%')
        LIMIT ${pageSize} OFFSET ${pageSize * req.query.page};`
    }

    connection.query(choppedSearchQuery, function (error, results, fields) {
        if (error) {
            res.json({ results: [] })
        } else if (results) {
            res.json({ results: results })
        }
    });
    console.log(choppedSearchQuery)
}

// Route 6
async function find_recipes_by_chopped(req, res) {
    const episodeNum = req.query.EpisodeNum;
    
    if (episodeNum) {
        choppedSimilarRecipesSearchQuery = `
        SELECT rec.*, series_episode
        FROM (
                 SELECT ingr.recipe_id AS recipe_id, ingr.series_episode AS series_episode
                 FROM Ingredients_Correct ingr
                 WHERE ingr.series_episode IS NOT NULL
                   AND ingr.recipe_id IS NOT NULL
                   AND series_episode = ${episodeNum}
             ) AS chopped_matching_recipes
        JOIN Recipe rec
        ON chopped_matching_recipes.recipe_id = rec.id
        LIMIT 10;`

        connection.query(choppedSimilarRecipesSearchQuery, function (error, results, fields) {
            if (error) {
                res.json({ results: [] })
            } else if (results) {
                res.json({ results: results })
            }
        });
    } else {
        // error
        res.json({ results: [] })
    }
}


// Route 7
async function find_chopped_likelihood(req, res) {
    const recipe_id = req.query.RecipeId;
    const pageSize = req.query.pagesize ? req.query.pagesize : 10;
    
    if (recipe_id) {
        choppedLikelihoodQuery = `
        WITH ChoppedIngrEpisodeCount AS (
            SELECT *
            FROM (
                SELECT uses.ingredients AS ingredients, COUNT(uses.series_episode) AS num_episodes, SUBSTR(episode.air_date, LENGTH(episode.air_date) - 1, 2) AS year
                FROM ChoppedUses uses
                JOIN ChoppedEpisode episode
                ON uses.series_episode = episode.series_episode
                GROUP BY year, ingredients
                ORDER BY num_episodes DESC
                ) AS combined_year
            ORDER BY ingredients, num_episodes DESC
        ),
        ChoppedIngrAvgAppearancePerYear AS (
            SELECT ingredients, AVG(num_episodes) AS avg_episode_occurrence_per_yr, SUM(num_episodes) AS total_occurrences, COUNT(year) AS num_years_appeared
            FROM ChoppedIngrEpisodeCount
            GROUP BY ingredients
            ORDER BY num_years_appeared DESC
        ),
        MatchingRecipeIngrs AS (
            SELECT ingr.recipe_id, ingr.ingredient, chop.*
            FROM Ingredients_Correct ingr
            JOIN ChoppedIngrAvgAppearancePerYear chop ON LOWER(ingr.ingredient) LIKE CONCAT('%', LOWER(chop.ingredients), '%')
            WHERE ingr.recipe_id IS NOT NULL AND ingr.recipe_id = ${recipe_id}
        )
        SELECT DISTINCT recipe_id, ingredients, avg_episode_occurrence_per_yr, total_occurrences, num_years_appeared
        FROM MatchingRecipeIngrs;`

        if (req.query.page && !isNaN(req.query.page)) {
            choppedLikelihoodQuery = `
            WITH ChoppedIngrEpisodeCount AS (
                SELECT *
                FROM (
                    SELECT uses.ingredients AS ingredients, COUNT(uses.series_episode) AS num_episodes, SUBSTR(episode.air_date, LENGTH(episode.air_date) - 1, 2) AS year
                    FROM ChoppedUses uses
                    JOIN ChoppedEpisode episode
                    ON uses.series_episode = episode.series_episode
                    GROUP BY year, ingredients
                    ORDER BY num_episodes DESC
                    ) AS combined_year
                ORDER BY ingredients, num_episodes DESC
            ),
            ChoppedIngrAvgAppearancePerYear AS (
                SELECT ingredients, AVG(num_episodes) AS avg_episode_occurrence_per_yr, SUM(num_episodes) AS total_occurrences, COUNT(year) AS num_years_appeared
                FROM ChoppedIngrEpisodeCount
                GROUP BY ingredients
                ORDER BY num_years_appeared DESC
            ),
            MatchingRecipeIngrs AS (
                SELECT ingr.recipe_id, ingr.ingredient, chop.*
                FROM Ingredients_Correct ingr
                JOIN ChoppedIngrAvgAppearancePerYear chop ON LOWER(ingr.ingredient) LIKE CONCAT('%', LOWER(chop.ingredients), '%')
                WHERE ingr.recipe_id IS NOT NULL AND ingr.recipe_id = ${recipe_id}
            )
            SELECT DISTINCT recipe_id, ingredients, avg_episode_occurrence_per_yr, total_occurrences, num_years_appeared
            FROM MatchingRecipeIngrs
            LIMIT ${pageSize} OFFSET ${pageSize * req.query.page};`
        }

        connection.query(choppedLikelihoodQuery, function (error, results, fields) {
            if (error) {
                res.json({ results: [] })
            } else if (results) {
                res.json({ results: results })
            }
        });
    } else {
        // error
        res.json({ results: [] })
    }
    
}

// Route 8
async function search_recipes_by_ingredients(req, res) {
    const pageSize = req.query.pagesize ? req.query.pagesize : 10;
    const ingredient1Name = req.query.Ingredient1 ? req.query.Ingredient1 : '';
    const ingredient2Name = req.query.Ingredient2 ? req.query.Ingredient2 : '';
    const ingredient3Name = req.query.Ingredient3 ? req.query.Ingredient3 : '';

    recipeSearchQuery = `
    SELECT rec.*, num_matching_ingredients
    FROM (
             SELECT COUNT(ingredient) AS num_matching_ingredients, recipe_id
             FROM (
                      SELECT ingr1.ingredient as ingredient, ingr1.recipe_id as recipe_id
                      from Ingredients_Correct ingr1
                      WHERE ingr1.ingredient LIKE ' % ${ingredient1Name} % '
                      UNION ALL
                      SELECT ingr2.ingredient as ingredient, ingr2.recipe_id as recipe_id
                      from Ingredients_Correct ingr2
                      WHERE ingr2.ingredient = ' % ${ingredient2Name} % '
                      UNION ALL
                      SELECT ingr3.ingredient as ingredient, ingr3.recipe_id as recipe_id
                      from Ingredients_Correct ingr3
                      WHERE ingr3.ingredient = ' % ${ingredient3Name} % '
                  ) AS matching_recipes
             WHERE recipe_id IS NOT NULL
             GROUP BY recipe_id
             ORDER BY num_matching_ingredients DESC
         ) AS all_recipes
    JOIN Recipe rec
    ON all_recipes.recipe_id = rec.id;`

    if (req.query.page && !isNaN(req.query.page)) {
        recipeSearchQuery = `
        SELECT rec.*, num_matching_ingredients
        FROM (
                SELECT COUNT(ingredient) AS num_matching_ingredients, recipe_id
                FROM (
                        SELECT ingr1.ingredient as ingredient, ingr1.recipe_id as recipe_id
                        from Ingredients_Correct ingr1
                        WHERE ingr1.ingredient LIKE '%${ingredient1Name}%'
                        UNION ALL
                        SELECT ingr2.ingredient as ingredient, ingr2.recipe_id as recipe_id
                        from Ingredients_Correct ingr2
                        WHERE ingr2.ingredient = '%${ingredient2Name}%'
                        UNION ALL
                        SELECT ingr3.ingredient as ingredient, ingr3.recipe_id as recipe_id
                        from Ingredients_Correct ingr3
                        WHERE ingr3.ingredient = '%${ingredient3Name}%'
                    ) AS matching_recipes
                WHERE recipe_id IS NOT NULL
                GROUP BY recipe_id
                ORDER BY num_matching_ingredients DESC
            ) AS all_recipes
        JOIN Recipe rec
        ON all_recipes.recipe_id = rec.id
        LIMIT ${pageSize} OFFSET ${pageSize * req.query.page};`
    }

    connection.query(recipeSearchQuery, function (error, results, fields) {
        if (error) {
            res.json({ results: [] })
        } else if (results) {
            console.log(results.length)
            res.json({ results: results })
        }
    });
}


// Route 9
async function search_users_by_reviews(req, res) {
    const pageSize = req.query.pagesize ? req.query.pagesize : 10;
    const numRecipes = req.query.NumRecipes ? req.query.NumRecipes: 0;
    const numReviews = req.query.NumReviews ? req.query.NumReviews : 1;
    const avgRatingReceived = req.query.AvgRatingReceived ? req.query.AvgRatingReceived : 2.0;
    const avgRatingGiven = req.query.AvgRatingGiven ? req.query.AvgRatingGiven : 1.0;


    var userSearchQuery = `
    SELECT *
    FROM Users
    WHERE num_recipes >= ${numRecipes} 
        AND num_reviews >= ${numReviews}
        AND avg_rating_received >= ${avgRatingReceived} 
        AND avg_rating_given >= ${avgRatingGiven};`

    if (req.query.page && !isNaN(req.query.page)) {
        userSearchQuery = `
        SELECT *
        FROM Users
        WHERE num_recipes >= ${numRecipes} 
            AND num_reviews >= ${numReviews}
            AND avg_rating_received >= ${avgRatingReceived} 
            AND avg_rating_given >= ${avgRatingGiven}
        LIMIT ${pageSize} OFFSET ${pageSize * req.query.page};`
    }

    console.log(userSearchQuery)

    connection.query(userSearchQuery, function (error, results, fields) {
        if (error) {
            res.json({ results: [] })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

// Route 10
async function get_all_recipes_from_user(req, res) {
    const pageSize = req.query.pagesize ? req.query.pagesize : 10;
    console.log("pagesize: " + pageSize)
    const userId = req.params.userId;

    recipeSearchQuery = `
    SELECT *
    FROM Recipe
    WHERE contributor_id = ${userId};`

    if (req.query.page && !isNaN(req.query.page)) { 
        recipeSearchQuery = `
        SELECT *
        FROM Recipe
        WHERE contributor_id = ${userId}
        LIMIT ${pageSize} OFFSET ${pageSize * req.query.page};`
    }

    console.log(recipeSearchQuery)

    connection.query(recipeSearchQuery, function (error, results, fields) {
        if (error) {
            res.json({ results: [] })
        } else if (results) {
            res.json({ results: results })
        }
    });
}

// Route 11
async function get_all_reviews_from_user(req, res) {
    const pageSize = req.query.pagesize ? req.query.pagesize : 10;
    const userId = req.params.userId;

    reviewSearchQuery = `
    SELECT *
    FROM Review
    WHERE user_id = ${userId};`

    if (req.query.page && !isNaN(req.query.page)) { 
        reviewSearchQuery = `
        SELECT *
        FROM Review
        WHERE user_id = ${userId}
        LIMIT ${pageSize} OFFSET ${pageSize * req.query.page};`
    }

    connection.query(reviewSearchQuery, function (error, results, fields) {
        if (error) {
            res.json({ results: [] })
        } else if (results) {
            console.log(results)
            res.json({ results: results })
        }
        
    });
}

// EXTRA ROUTES

async function get_all_recipes(req, res) {
    const pageSize = req.query.pagesize ? req.query.pagesize : 10;

    var recipesQuery = `
    SELECT *
    FROM Recipe;`

    if (req.query.page && !isNaN(req.query.page)) { 
        var recipesQuery = `
        SELECT *
        FROM Recipe
        LIMIT ${pageSize} OFFSET ${pageSize * req.query.page};`
    }

    connection.query(recipesQuery, function (error, results, fields) {
        if (error) {
            console.log(error)
        } else if (results) {
            //console.log(results)
            res.json({ results: results })
        }
    });
}

async function get_all_chopped(req, res) {
    const pageSize = req.query.pagesize ? req.query.pagesize : 10;
    var choppedQuery = `
    SELECT * 
    FROM ChoppedEpisode;`

    if (req.query.page && !isNaN(req.query.page)) { 
        var choppedQuery = `
        SELECT * 
        FROM ChoppedEpisode 
        LIMIT ${pageSize} OFFSET ${pageSize * req.query.page};`
    }
    // console.log(choppedQuery)


    connection.query(choppedQuery, function (error, results, fields) {
        if (error) {
            console.log(error)
        } else if (results) {
            // console.log(results)
            res.json({ results: results })
        }
    });
}

async function get_all_users(req, res) {
    const pageSize = req.query.pagesize ? req.query.pagesize : 10;
    // const pageSize = 10
    var userQuery = `
    SELECT *
    FROM Users;`

    if (req.query.page && !isNaN(req.query.page)) { 
        userQuery = `
        SELECT *
        FROM Users
        LIMIT ${pageSize} OFFSET ${pageSize * req.query.page};`
    }


    connection.query(userQuery, function (error, results, fields) {
        if (error) {
            console.log(error)
        } else if (results) {
            //console.log(results)
            res.json({ results: results })
        }
    });
}

async function get_user_by_id(req, res) {
    const userId = req.params.userid ? req.params.userid : 1;
    console.log(userId)

    var userQuery = `SELECT *
    FROM Users
    WHERE id =${userId}`

    connection.query(userQuery, function (error, results, fields) {
        if (error) {
            console.log(error)
        } else if (results) {
            console.log(results)
            res.json({ results: results })
        }
    });
}

// not tested -> test before using
async function get_recipe_by_id(req, res) {
    const recipeId = req.query.recipeId ? req.query.recipeId : 1;

    var recipeQuery = `SELECT *
    FROM Recipe
    WHERE id =${recipeId}`
    connection.query(recipeQuery, function (error, results, fields) {
        if (error) {
            console.log(error)
        } else if (results) {
            res.json({ results: results })
        }
    });
}

async function get_chopped_episode_ingredients(req, res) {
    const choppedEpisodeId = req.query.EpisodeNum;

    if (choppedEpisodeId) {
        var choppedIngredientQuery = `SELECT ingredients
        FROM ChoppedUses
        WHERE series_episode =${choppedEpisodeId}`
    
        connection.query(choppedIngredientQuery, function (error, results, fields) {
            if (error) {
                console.log(error)
            } else if (results) {
                //console.log(results)
                res.json({ results: results })
            }
        });
    } else {
        //error
        console.log(error)
        res.json({ results: [] })
    }
}

async function search_recipes_by_name(req, res) {
    const recipe_name = req.query.RecipeName ? req.query.RecipeName : '';
    const pageSize = req.query.pagesize ? req.query.pagesize : 10;
    console.log("made it here")

    recipeSearchQuery = `SELECT name, n_steps, minutes
        FROM Recipe
        WHERE name LIKE '%${recipe_name}%'
        LIMIT 10;`
    
    if (req.query.page && !isNaN(req.query.page)) { 
        recipeSearchQuery = `SELECT *
        FROM Recipe
        WHERE name LIKE '%${recipe_name}%'
        LIMIT ${pageSize} OFFSET ${pageSize * req.query.page};`
    }
    connection.query(recipeSearchQuery, function (error, results, fields) {
        if (error) {
            console.log("error here")
            res.json({ results: [] })
        } else if (results) {
            console.log(results)
            res.json({ results: results })
        }
    });
}

async function get_recipe_ingredients(req, res) {
    const recipeId = req.query.RecipeId;
    console.log(recipeId)

    if (recipeId) {
        var recipeIngredientQuery = `SELECT *
        FROM IngredientDescriptions
        WHERE id =${recipeId}`
    
        connection.query(recipeIngredientQuery, function (error, results, fields) {
            if (error) {
                console.log(error)
            } else if (results) {
                console.log(results)
                res.json({ results: results })
            }
        });
    } else {
        //error
        console.log(error)
        res.json({ results: [] })
    }
    
}

async function find_similar_recipe_sugar_calories(req, res) {
    const recipeId = req.query.RecipeId;
    const num_calories = req.query.Calories;
    const max_sugar = req.query.Sugar;
    console.log(req.query)

    if (recipeId) {
        var recipeIngredientQuery = `SELECT id, name, sugar, num_calories
        FROM Recipe
        WHERE id !=${recipeId} AND (sugar BETWEEN (${max_sugar} -5) AND ${max_sugar}) AND (num_calories BETWEEN (${num_calories} - 5) AND ${num_calories})
        ORDER BY RAND()`
    
        connection.query(recipeIngredientQuery, function (error, results, fields) {
            if (error) {
                console.log(error)
            } else if (results) {
                console.log(results)
                res.json({ results: results })
            }
        });
    } else {
        //error
        console.log(error)
        res.json({ results: [] })
    }
    
}



module.exports = {
    hello,
    jersey,
    all_matches,
    all_players,
    match,
    player,
    search_matches,
    search_players,
    search_recipes_by_traits,
    search_recipes_by_review,
    search_recipes_by_nutrition,
    search_chopped_by_episode,
    search_chopped_by_ingredients,
    find_recipes_by_chopped,
    find_chopped_likelihood,
    search_recipes_by_ingredients,
    search_users_by_reviews,
    get_all_recipes_from_user,
    get_all_reviews_from_user,
    get_all_recipes,
    get_all_chopped,
    get_all_users,
    get_user_by_id,
    get_recipe_by_id,
    get_chopped_episode_ingredients,
    search_recipes_by_name,
    get_recipe_ingredients,
    find_similar_recipe_sugar_calories
}
