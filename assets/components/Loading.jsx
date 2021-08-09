import React from "react";

const Loading = () => (
  <main style={{height:'500px', width:'100%'}}>
    <div
    className="spinner-border"
    role="status"
    style={{
      color: "#e77110",
      width: "50px",
      height: "50px",
      position: "absolute",
      top: "50%",
      left: "50%",
      zIndex: "1040",
    }}
  >
    <span className="sr-only"></span>
  </div>
  </main>
);

export default Loading;
