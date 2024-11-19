import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "../utils/firebase";
import RecipeDetail from "./RecipeDetail";
import backArrow from "../assets/search.png";

const db = getFirestore(app);

export const fetchRecipes = async () => {
  try {
    const recipesCollection = collection(db, "recipe");
    const snapshot = await getDocs(recipesCollection);

    const recipes = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return recipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

const AllRecipe = ({ homeSearch }) => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [filterTags, setFilterTags] = useState("");
  const [calorieFilter, setCalorieFilter] = useState(1000); // Default calorie filter
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchApplied, setSearchApplied] = useState(false);

  useEffect(() => {
    const loadRecipes = async () => {
      const data = await fetchRecipes();
      setRecipes(data);
      setFilteredRecipes(data); // Initialize with all recipes
    };

    loadRecipes();
  }, []);

  const handleSearch = () => {
    const filtered = recipes.filter(
      (recipe) =>
        recipe.calorieCount <= calorieFilter &&
        recipe.tags
          ?.map((tag) => tag.toLowerCase())
          .some((tag) => tag.includes(filterTags.toLowerCase()))
    );
    setFilteredRecipes(filtered);
    setSearchApplied(true);
  };

  const handleCalorieChange = (e) => {
    setCalorieFilter(Number(e.target.value));
    const filtered = recipes.filter((recipe) => recipe.calorieCount <= Number(e.target.value));
    setFilteredRecipes(filtered);
  };

  if (selectedRecipeId) {
    return (
      <RecipeDetail
        showDetail={setSelectedRecipeId}
        id={selectedRecipeId}
        homeSearch={homeSearch(false)}
        setHomeSearch={homeSearch}
      />
    );
  }

  return (
    <div style={styles.container}>
      {/* Filter Section */}
      <div style={styles.filterSection}>
        <h3 style={styles.filterTitle}>Filter Recipes</h3>
        <div style={styles.filterInputContainer}>
          <input
            type="text"
            placeholder="Search by tags (e.g., vegan, spicy)"
            value={filterTags}
            onChange={(e) => setFilterTags(e.target.value)}
            style={styles.filterInput}
          />
          <button onClick={handleSearch} style={styles.filterButton}>
            <img
              src={backArrow}
              alt="Search"
              style={{ width: "20px", height: "20px" }} // Proportional icon size
            />
          </button>
        </div>

        <div style={styles.calorieFilter}>
          <label style={styles.calorieLabel}>
            Max Calories: <strong>{calorieFilter}</strong>
          </label>
          <input
            type="range"
            min="0"
            max="2000"
            step="10"
            value={calorieFilter}
            onChange={handleCalorieChange}
            style={styles.slider}
          />
        </div>
      </div>

      {/* Recipes Grid */}
      <div style={styles.gridContainer}>
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            style={styles.card}
            onClick={() => setSelectedRecipeId(recipe.id)}
          >
            <img src={recipe.photos} alt={recipe.recipeName} style={styles.image} />
            <h3 style={styles.title}>{recipe.recipeName}</h3>
          </div>
        ))}
        {searchApplied && filteredRecipes.length === 0 && (
          <p style={styles.noResults}>No recipes match your filter. Try again!</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    padding: "20px",
  },
  filterSection: {
    width: "500px",
    padding: "20px",
    backgroundColor: "#f4f4f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginRight: "20px",
  },
  filterTitle: {
    marginBottom: "15px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  filterInputContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  filterInput: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    height: "40px",
  },
  filterButton: {
    width: "40px",
    height: "40px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "background-color 0.3s",
  },
  calorieFilter: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  calorieLabel: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
  },
  slider: {
    width: "100%",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(450px, max-content))",
    gap: "40px",
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.3s",
  },
  image: {
    width: "100%",
    height: "350px",
    objectFit: "cover",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
  },
  title: {
    margin: "10px 0",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
  },
  noResults: {
    gridColumn: "1 / -1",
    textAlign: "center",
    fontSize: "18px",
    color: "#777",
    marginTop: "20px",
  },
};

export default AllRecipe;
