import React from 'react';

import { 
  Form, 
  FormControl,
  Button,
} from 'react-bootstrap';

const RecipeCard = ({ name, id, minutes, contributor_id, n_steps}) => {
  return (
    <div className="card" style={{ marginRight: "20px", marginTop: "20px", padding: "20px" }}>
      <h4>Recipe Name: {name}</h4>
      <h4>{minutes} minutes</h4>
      <h4>{n_steps} steps</h4>
      <span>Contributing User ID: {contributor_id}</span>
    </div>
  )
};


export default RecipeCard
