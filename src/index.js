import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StarRating } from "./Components/StarRating";

function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <StarRating
        color="dodgerblue"
        maxRating={10}
        className="test"
        onSetRating={setMovieRating}
      />
      <p>This movie was rated {movieRating}</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating={5} />
    <StarRating maxRating={5} color="#7148FC" size={30} defaultRating={2} />
    <Test /> */}
  </React.StrictMode>
);
