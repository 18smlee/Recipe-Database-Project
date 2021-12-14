import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import PlayersPage from './pages/PlayersPage';
import 'antd/dist/antd.css';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import "shards-ui/dist/css/shards.min.css"
import MatchesPage from './pages/MatchesPage';
import UsersPage from './pages/UsersPage';
import MealMakerPage from './pages/MealMakerPage';
import ChoppedPage from './pages/ChoppedPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import RecipesPage from './pages/RecipesPage';
import UserDetailPage from './pages/UserDetailPage';

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route exact
							path="/"
							render={() => (
								<HomePage />
							)}/>
        <Route exact
							path="/players"
							render={() => (
								<PlayersPage />
							)}/>
        <Route exact
							path="/matches"
							render={() => (
								<MatchesPage />
							)}/>
		<Route exact
							path="/users/:userId"
							render={(props) => (
								<UserDetailPage {...props}/>
							)}/>
		<Route exact
							path="/users"
							render={() => (
								<UsersPage />
							)}/>
		<Route exact
							path="/mealmaker"
							render={() => (
								<MealMakerPage />
							)}/>
		<Route exact
							path="/chopped"
							render={() => (
								<ChoppedPage />
							)}/>
		<Route exact
							path="/recipe/:recipeId"
							render={() => (
								<RecipeDetailPage />
							)}/>
		<Route exact
							path="/recipes"
							render={() => (
								<RecipesPage />
							)}/>
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

