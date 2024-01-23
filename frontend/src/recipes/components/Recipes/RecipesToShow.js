import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import RecipeItem from "./RecipeItem";
import styles from "./RecipesToShow.module.css";

const RecipesToShow = (props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const recipesPerPage = 15;
  const indexOfLastRecipe = (currentPage + 1) * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = props.recipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const totalPages = Math.ceil(props.recipes.length / recipesPerPage);

  return (
    <>
      <section className={"section"}>
        <main className={`${styles["main-content"]} wrapper`}>
          <h2 className={styles["title"]}>Recipes({props.recipes.length})</h2>
          <div className={styles["recipes-list-container"]}>
            {currentRecipes.map((recipe) => (
              <RecipeItem
                key={recipe._id}
                _id={recipe._id}
                path={props.path}
                name={recipe.name}
                ingredients={recipe.ingredients}
                instructions={recipe.instructions}
                image={recipe.image}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={2}
              marginPagesDisplayed={1}
              onPageChange={handlePageChange}
              containerClassName={styles.pagination}
              activeClassName={styles.activePage}
              previousLabel={
                <span className={styles.paginationItem}>Previous</span>
              }
              nextLabel={<span className={styles.paginationItem}>Next</span>}
            />
          )}
        </main>
      </section>
    </>
  );
};

export default RecipesToShow;
