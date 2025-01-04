import React from "react";

const Header = ({ resetBoard }) => {
  return (
    <header className="bg-[#0079bf] text-white p-4 flex justify-between items-center">
      <h1 className="text-xl">Trello Clone</h1>
      <button
        onClick={resetBoard}
        className="bg-[#ff5c5c] text-white py-2 px-4 rounded hover:bg-[#e04d4d]"
      >
        Reset Board
      </button>
    </header>
  );
};

export default Header;
