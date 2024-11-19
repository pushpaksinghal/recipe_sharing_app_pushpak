import React from "react";

function ProfilePage({ user }) {
  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      {user ? (
        <div>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>UID:</strong> {user.uid}</p>
          {/* Add more user details or profile options here */}
        </div>
      ) : (
        <p>You are not signed in.</p>
      )}
    </div>
  );
}

export default ProfilePage;
