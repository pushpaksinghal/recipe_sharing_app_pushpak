import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from "../utils/firebase"; // Firebase initialization
import '../css/recipeDetail.css'; // Import the CSS file

const db = getFirestore(app);

const RecipeDetails = ({id,showDetail}) => {
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

  return (
    <div className="container">
      <button className="button" onClick={()=>{
    
        showDetail(null)
      }}>Back</button>

      <img src={recipe.photos} alt={recipe.recipeName} className="image" />
      <h1 className="heading">{recipe.recipeName}</h1>
      <p className="section">
        <strong className="highlight">Ingredients:</strong> {recipe.ingredients}
      </p>
      <p className="section">
        <strong className="highlight">Procedure:</strong> {recipe.procedure}
      </p>
      <p className="section">
        <strong className="highlight">Calories:</strong> {recipe.calorieCount}
      </p>
      <div className="reviews">
        <p>
          <strong className="highlight">Likes:</strong> ❤️ 123
        </p>
        <p>
          <strong className="highlight">Reviews:</strong> 🌟🌟🌟🌟🌟
        </p>
      </div>
    </div>
  );
};

export default RecipeDetails;
