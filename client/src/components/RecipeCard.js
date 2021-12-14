import React from 'react';

import {
  Card,
} from 'react-bootstrap';

const RecipeCard = ({ name, id, minutes, contributor_id, n_steps, showRecipeDetails, handler}) => {
  return (
    <Card style={{ marginRight: "20px", marginTop: "20px", padding: "20px" }} onClick = {handler}>
      <h4>Recipe Name: {name}</h4>
      <h4>{minutes} minutes</h4>
      <h4>{n_steps} steps</h4>
      <span>Contributing User ID: {contributor_id}</span>
    </Card>
  )
};


export default RecipeCard
