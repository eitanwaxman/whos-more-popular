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

type Page = {
  name: String;
  id: String;
};

function App() {
  const [userToken, setUserToken] = useState<String>();
  const [pages, setPages] = useState<Array<Object>>();
  const [selectedPage, setSelectedPage] = useState<Page>();
  const [instagramAccount, setInsagramAccount] = useState<any>();

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
    const pagesList = await response.json();
    console.log(pagesList);
    setPages(pagesList.data);
  };

  const handleChoosePage = (page: Page) => {
    setSelectedPage(page);
    console.log(page);
  };

  const getInstagramBusinessAccount = async () => {
    if (selectedPage) {
      const url = `https://graph.facebook.com/v14.0/${selectedPage.id}?fields=instagram_business_account&access_token=${userToken}`;
      const response = await fetch(url);
      const instagramAccountData = await response.json();
      setInsagramAccount(instagramAccountData);
      console.log(instagramAccountData);
    }
  };

  useEffect(() => {
    getInstagramBusinessAccount();
  }, [selectedPage]);

  return (
    <>
      <div className="login">
        <button onClick={logInWithFacebook}>Log in with Facebook</button>
        <button onClick={getUsersPages}>Get Pages</button>
        {pages?.map((page: any) => (
          <p onClick={() => handleChoosePage(page)}>{page.name}</p>
        ))}
      </div>
    </>
  );
}

export default App;
