import React from "react";
import {Card, Rate, Row, Col} from "antd"
import { CardImg, Image } from "react-bootstrap";


const UserCard = ({ id, photo, avgRatingReceived, avgRatingGiven, numRecipes, numReviews, handler}) => {
    return (
        <div className="card" style={{ margin: "20px", padding: "20px" }} onClick={handler}>
        <Row justify="left">
            <Row justify="left">
                <CardImg src={photo} height={100} width={100}/>
            </Row>
            <Row justify="left">
                <h3>{id}</h3>
            </Row>
        </Row>
        
          
          <Row>
            <Col>
                <h5> Average Rating Received</h5>
                <Rate disabled value={avgRatingReceived} />
            </Col>
            </Row>
            <Row>
            <Col>
                <h5> Average Rating Given</h5>
                <Rate disabled value={avgRatingGiven} />
            </Col>
            </Row>
            <Row>
                <Col>
                    <h5> Recipes Contributed: {numRecipes ? numRecipes : 0}</h5>
                    
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5> Reviews Given: {numReviews ? numReviews : 0}</h5>
                </Col>
            </Row>
            
        </div>
      );
};


export default UserCard;