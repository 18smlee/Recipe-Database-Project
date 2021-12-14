import React from 'react';

import {
  Card,
  Badge
} from 'react-bootstrap';

const RecipeCard = ({ name, id, minutes, contributor_id, n_steps, showRecipeDetails, handler, submitted}) => {
  return (
    <Card style={{ marginRight: "20px", marginTop: "20px", padding: "20px" }} onClick = {handler}>
      <div className="card-content">
        <h4 style={{textTransform: 'capitalize'}}>{name}</h4>
        <p class="fw-light">Published {submitted}</p>
        <Badge bg="secondary" text="light">
            </Badge>{' '}
        <Badge bg="warning" text="dark">
      {minutes} minutes
            </Badge>{' '}
      <Badge bg="info" text="dark">
      {n_steps} steps
            </Badge>{' '}
      </div>
    </Card>
  )
};


export default RecipeCard
