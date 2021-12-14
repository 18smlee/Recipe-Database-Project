import React from 'react';

import { 
  Form, 
  FormControl,
  Button,
} from 'react-bootstrap';

const RecipeCard = ({ name, id, minutes, contributor_id, n_steps}) => {
  return (
    <div className="card" style={{ marginRight: "20px", marginTop: "20px", padding: "20px" }}>
      <h3>{name}</h3>
      <h6>{minutes} minutes</h6>
      <h6>{n_steps} steps</h6>
      {/* <span>Contributing User ID: {contributor_id}</span> */}
    </div>
  )
};


export default RecipeCard
