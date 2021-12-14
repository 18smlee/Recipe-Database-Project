import React from "react";
import {Card, Rate} from "antd"
import { CardImg, Image } from "react-bootstrap";


const UserCard = ({ id, name, photo, avgRatingReceived, handler}) => {
    return (
        <div className="card" style={{ margin: "20px", padding: "20px" }} onClick={handler}>
            <CardImg src={photo} as={Image}/>
          <div className="card-content">
            <h5>{id}</h5>
            <h6>
              {name}
            </h6>
            <h6>Average Rating Received</h6>
                <Rate disabled value={avgRatingReceived} />
            {/* <p className="content">{seriesEpisode}</p> */}
          </div>
        </div>
      );
};


export default UserCard;