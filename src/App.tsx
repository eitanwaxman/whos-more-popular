import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

declare global {
  interface Window {
    FB: any;
  }
}

function App() {
  let FB = window.FB;
  useEffect(() => {
    FB.getLoginStatus(function (response: Object) {
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
