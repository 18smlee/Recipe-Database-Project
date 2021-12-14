
import React from "react";
import {
  Card,
  Badge
} from "react-bootstrap"

const ChoppedEpisodeCard = ({ episodeName, airDate, seriesEpisode, modalFunc }) => {
    return (
      <Card style={{ margin: "20px", padding: "20px" }} onClick={modalFunc}>
          <div className="card-content">
            <h5>{episodeName}</h5>
            <Badge bg="info">
            Ep. {seriesEpisode}
            </Badge>{' '}
            <Badge bg="light" text="dark">
            Aired on {airDate} 
            </Badge>{' '}
          </div>
      </Card>
       
      );
};


export default ChoppedEpisodeCard;