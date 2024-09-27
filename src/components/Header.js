import React from "react";

function Header() {
  return (
    <div className="p-3 bg-background text-4xl font-semibold flex justify-between">
      <a href="/" className="flex">
        <h1 className="bg-gradient-to-r from-primary via-secondary to-accent text-transparent bg-clip-text">
          GMB
        </h1>
      </a>
    </div>
  );
}

export default Header;
