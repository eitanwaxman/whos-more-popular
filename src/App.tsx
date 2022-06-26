import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

declare global {
  interface Window {
    FB: any;
  }
}

let FB = window.FB;

type Auth = {
  status: String;
  authResponse: {
    accessToken: String;
    expiresIn: Date;
    reauthorize_required_in: Number;
    graphDomain: "facebook";
    signedRequest: String;
    userID: String;
  };
};

function App() {
  const [userToken, setUserToken] = useState<String>();

  useEffect(() => {
    FB.getLoginStatus(function (response: Auth) {
      console.log(response);
      if (response.status === "connected") {
        setUserToken(response.authResponse.accessToken);
      }
    });
  }, []);

  const logInWithFacebook = async () => {
    FB.login(
      (response: Auth) => {
        console.log(response);
        if (response.status === "connected") {
          setUserToken(response.authResponse.accessToken);
        }
      },
      {
        scope: "instagram_basic, pages_show_list",
      }
    );
  };

  const getUsersPages = async () => {
    const url = `https://graph.facebook.com/v14.0/me/accounts?access_token=${userToken}`;
    const response = await fetch(url);
    console.log(response);
  };

  return (
    <>
      <div className="login">
        <button onClick={logInWithFacebook}>Log in with Facebook</button>
        <button onClick={getUsersPages}>Get Pages</button>
      </div>
    </>
  );
}

export default App;
