import React from "react";
import {Rate, } from "antd"
import { Card, Row, Col} from "react-bootstrap";


const UserCard = ({ id, photo, avgRatingReceived, avgRatingGiven, numRecipes, numReviews, handler}) => {
    return (
        <div className="card" style={{ margin: "20px", padding: "20px" }} onClick={handler}>
        <Row justify="left">
        <div style={{marginTop:"10px"}}>
            <img style={{verticalAlign: 'middle'}} src="https://raw.githubusercontent.com/18smlee/Recipe-Database-Project/sam_dev/client/src/images/person_icon.png" height="40" width="40"/>
            <h3 style={{verticalAlign: 'middle', display:'inline', marginLeft:'15px'}}>@{id}</h3>
                            </div>
        </Row>
        
          
          <Row>
            <Col>
                <h6 style={{marginTop:"10px"}}> Average Rating Received</h6>
                <Rate style={{marginBottom:"10px"}} disabled value={avgRatingReceived} />
            </Col>
            </Row>
            <Row>
            <Col>
                <h6 style={{marginTop:"10px"}}> Average Rating Given</h6>
                <Rate  style={{marginBottom:"10px"}} disabled value={avgRatingGiven} />
            </Col>
            </Row>
            <Row>
                <Col>
                    <h6> Recipes Contributed: {numRecipes ? numRecipes : 0}</h6>
                    
                </Col>
            </Row>
            <Row>
                <Col>
                    <h6> Reviews Given: {numReviews ? numReviews : 0}</h6>
                </Col>
            </Row>
            
        </div>
      );
};


export default UserCard;