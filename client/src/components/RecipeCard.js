import React from 'react';

import { 
  Form, 
  FormControl,
  Button,
} from 'react-bootstrap';

function RecipeCard() {
  return (
    <div className="card" style={{ marginRight: "20px", marginTop: "20px", padding: "20px" }}>
      <h4>Recipe Title</h4>
      <span>User</span>
    </div>
  )
}

export default RecipeCard
