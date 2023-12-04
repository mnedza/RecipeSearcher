import React from "react";
import RecipesSearch from "../components/Search/RecipesSearch";

const Search = (props) => {
  return (
    <>
      <RecipesSearch>{props.children}</RecipesSearch>
    </>
  );
};

export default Search;
