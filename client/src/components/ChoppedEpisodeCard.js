
import React from "react";


const ChoppedEpisodeCard = ({ episodeName, airDate, seriesEpisode, modalFunc }) => {
    return (
        <div className="card" style={{ margin: "20px", padding: "20px" }} onClick={modalFunc}>
          <div className="card-content">
            <h5>{episodeName}</h5>
            <h6>
              {airDate}
            </h6>
            <p className="content">{seriesEpisode}</p>
          </div>
        </div>
      );
};


export default ChoppedEpisodeCard;