import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from "../utils/firebase"; // Firebase initialization
import "../css/recipeDetail.css"; // Import the CSS file
import backArrow from "../assets/backspace.png";

const db = getFirestore(app);

const RecipeDetail = ({ id, showDetail, setHomeSearch }) => {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const docRef = doc(db, "recipe", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setRecipe(docSnap.data());
      } else {
        console.error("No such document!");
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  // Function to capitalize the first letter of each word
  const capitalizeWords = (str) =>
    str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toLocaleUpperCase() + word.slice(1))
      .join(" ");

  const formatContent = (content) =>
    content
      .split(",")
      .filter((item) => item.trim() !== "") // Avoid gaps
      .map((item, index) => (
        <span key={index} className="formatted-content">
          {item.trim()}
          <br />
        </span>
      ));

  return (
    <div className="container">
      {/* Back Button */}
      <button
        className="back-button"
        onClick={() => {
          showDetail(null); // Clear the selected recipe
          setHomeSearch(true); // Set homeSearch to true when going back
        }}
      >
        <img src={backArrow} alt="Back" className="back-arrow-icon" />
      </button>

      {/* Main Content */}
      <div className="content-wrapper">
        <div className="text-section">
          <h1 className="heading">{capitalizeWords(recipe.recipeName)}</h1>
          <p className="section calories">
            <strong>Calories:</strong> {recipe.calorieCount}
          </p>
          {/* Buttons for likes and shares */}
          <div className="buttons">
            <button className="button">
              <span className="button-icon">❤️</span> Like (123)
            </button>
            <button className="button">
              <span className="button-icon">🔗</span> Share (45)
            </button>
          </div>
        </div>
        <div className="image-section">
          <img src={recipe.photos} alt={recipe.recipeName} className="image" />
        </div>
      </div>

      <hr />
      <br />

      {/* Ingredients and Procedure */}
      <div className="recipe-sections">
        <div className="ingredients">
          <h2>Ingredients</h2>
          <p>{formatContent(recipe.ingredients)}</p>
        </div>
        <div className="procedure">
          <h2>Procedure</h2>
          <p>{formatContent(recipe.procedure)}</p>
        </div>
      </div>

      <hr />
      <br />

      {/* Tags Section */}
      <div className="tags-section">
        <h3>Tags</h3>
        <div className="tags">
          {Array.isArray(recipe.tags) ? (
            recipe.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag.trim()}
              </span>
            ))
          ) : (
            recipe.tags
              ?.split(",")
              .filter((tag) => tag.trim() !== "")
              .map((tag, index) => (
                <span key={index} className="tag">
                  {tag.trim()}
                </span>
              ))
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h3>Reviews</h3>

        <p>
          <strong>Ratings:</strong> 🌟🌟🌟🌟🌟
        </p>
      </div>
    </div>
  );
};

export default RecipeDetail;
