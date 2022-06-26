import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  useEffect(() => {
    FB.getLoginStatus(function (response) {
      statusChangeCallback(response);
      console.log(response);
    });
  }, []);

  return (
    <>
      <div className="login">
        <button>Log in with Facebook</button>
      </div>
    </>
  );
}

export default App;
