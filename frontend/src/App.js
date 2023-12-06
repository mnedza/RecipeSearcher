import React, { useState, useCallback } from "react";
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

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const signIn = useCallback(() => {
    setIsSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    setIsSignedIn(false);
  }, []);

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
      value={{ isSignedIn: isSignedIn, signIn: signIn, signOut: signOut }}
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
