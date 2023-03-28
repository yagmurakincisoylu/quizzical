import React from "react";

function Loading() {

  return (
    <div className="height-100 loading-container">
      <h1>Loading</h1>
      <div className="loading-animation">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loading;