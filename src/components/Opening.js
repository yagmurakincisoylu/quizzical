import React from "react";

function Opening({getQuizData}) {

  return (
    <div className="height-100">
      <div className="opening-container height-100">
        <div>
          <h1>Quizzical</h1>
          <button className="btn-big" onClick={getQuizData}>Start quiz</button>
        </div>
      </div>
    </div>
  )
}

export default Opening;