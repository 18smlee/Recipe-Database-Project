import React from "react";
import {Rate} from "antd"


const UserCard = ({ id, name, photo, avgRatingReceived, handler}) => {
    return (
        <div className="card" style={{ margin: "20px", padding: "20px" }} onClick={handler}>
          <div className="card-content">
            <h5>{id}</h5>
            <h6>
              {name}
            </h6>
            <h6>Average Rating Received</h6>
                <Rate disabled defaultValue={avgRatingReceived ? avgRatingReceived : Math.random() * 5 } />
            {/* <p className="content">{seriesEpisode}</p> */}
          </div>
        </div>
      );
};


export default UserCard;