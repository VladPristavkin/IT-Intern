import React from "react";
import "./profileBackground.css";

function BackgroundProfile({ children }) {
    return (
      <div className="bg-profile">
        {children}
      </div>
    );
  }

export default BackgroundProfile;