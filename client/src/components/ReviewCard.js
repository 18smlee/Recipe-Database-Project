import React from "react";
import {Card, Rate} from "antd"
import { CardImg, Image } from "react-bootstrap";


const ReviewCard = ({ review, date, rating, handler}) => {
    return (
        <div className="card" style={{ margin: "20px", padding: "20px" }} onClick={handler}>
          <div className="card-content">
            <h5>{date}</h5>
                <Rate disabled value={rating} />
            <br></br>
            <i> {review} </i>
          </div>
        </div>
      );
};


export default ReviewCard;