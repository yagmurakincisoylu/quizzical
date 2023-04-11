import React from "react";

function Opening({getQuizData}) {

  return (
    <div>
      <div className="opening-container">
        <div>
          <h1>Quizzical</h1>
          <button className="btn-big" onClick={getQuizData}>Start quiz</button>
        </div>
      </div>
    </div>
  )
}

export default Opening;