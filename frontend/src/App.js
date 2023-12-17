import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// shared
import Home from "./shared/components/Home/Home";
import Navigation from "./shared/components/Navigation/Navigation";
import Footer from "./shared/components/Footer/Footer";
import PageNotFound from "./shared/components/PageNotFound404/PageNotFound";
import { AuthContext } from "./shared/context/auth-context";

// recipes
import Search from "./recipes/pages/Search";
import Recipes from "./recipes/pages/Recipes";
import Recipe from "./recipes/pages/Recipe";

// user
import SignIn from "./user/pages/SignIn";
import SignUp from "./user/pages/SignUp";
import Favorites from "./recipes/pages/Favorites";
import Profile from "./user/pages/Profile";

let logoutTimer;

const App = () => {
  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  const signIn = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
    setIsSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setIsSignedIn(false);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(signOut, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, signOut, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token && (new Date(storedData.expiration) > new Date())
    ) {
      signIn(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [signIn]);

  const routesWhenSignedIn = (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>

      <Route path="/recipes/:recipeId">
        <Recipe />
      </Route>

      <Route path="/recipes">
        <Recipes />
      </Route>

      <Route path="/search">
        <Search />
      </Route>

      <Route path="/favorites/:userId/:recipeId">
        <Recipe />
      </Route>

      <Route path="/favorites/:userId">
        <Favorites />
      </Route>

      <Route path="/profile/:userId">
        <Profile />
      </Route>

      <Route path="*">
        <PageNotFound />
      </Route>
    </Switch>
  );

  const routesWhenSignedOut = (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>

      <Route path="/recipes/:recipeId">
        <Recipe />
      </Route>

      <Route path="/recipes">
        <Recipes />
      </Route>

      <Route path="/search">
        <Search />
      </Route>

      <Route path="/sign-in">
        <SignIn />
      </Route>

      <Route path="/sign-up">
        <SignUp />
      </Route>

      <Route path="*">
        <PageNotFound />
      </Route>
    </Switch>
  );

  return (
    <AuthContext.Provider
      value={{
        isSignedIn: isSignedIn,
        token: token,
        userId: userId,
        signIn: signIn,
        signOut: signOut,
      }}
    >
      <Router>
        <Navigation />
        {isSignedIn && routesWhenSignedIn}
        {!isSignedIn && routesWhenSignedOut}
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
