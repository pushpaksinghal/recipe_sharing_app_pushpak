import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import HomeSearch from "./HomeSearchBlock.jsx";
import About from "./about.jsx";
import Category from "./category.jsx";
import DataSection from "./DataSection.jsx";
import UploadPage from "./UploadPage.jsx";
import ProfilePage from "./ProfilePage.jsx"; // Import the profile page component
import { auth } from "../utils/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import "../home.css";

function MainScreen() {
  const [user, setUser] = useState("no usr");
  const [showCategory, setShowCategory] = useState(false);
  const [showUploadPage, setShowUploadPage] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [homeSearch, setHomeSearch] = useState(true);
  const [showProfilePage, setShowProfilePage] = useState(false); // New state for profile page

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user ? user : null);
    });
  }, []);

  const handleCategoryClick = () => {
    setShowCategory(!showCategory);
    setShowUploadPage(false);
    setShowProfilePage(false); // Close profile page if category is opened
  };

  const handleProfileClick = () => {
    setShowProfilePage(true); // Show the profile page
    setShowCategory(false);
    setShowUploadPage(false); // Close other sections
  };

  const categoryHandled = (category) => {
    setSelectedCategory(category);
    setShowCategory(false);
    setShowUploadPage(true);
  };

  return (
    <div className="main-screen home">
      <NavBar
        onPlusClick={handleCategoryClick}
        onProfileClick={handleProfileClick} // Pass the handler for the profile icon
      />

      <div className="content">
        {showProfilePage ? (
          <ProfilePage user={user} /> // Render the profile page
        ) : showCategory ? (
          <Category clickHandle={categoryHandled} />
        ) : showUploadPage ? (
          <UploadPage
            selectedCategory={selectedCategory}
            setShowUploadPage={setShowUploadPage}
          />
        ) : (
          <>
            {user ? (
              <>
                {homeSearch ? <HomeSearch /> : <></>}
                <DataSection homeSearch={setHomeSearch} />
              </>
            ) : (
              <h1>You are not signed in</h1>
            )}
          </>
        )}
      </div>

      <About />
    </div>
  );
}

export default MainScreen;
