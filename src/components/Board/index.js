import React, { useState, useEffect } from "react";
import Header from "../Header";
import List from "../List";

const Board = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const savedLists = JSON.parse(localStorage.getItem("lists")) || [];
    setLists(savedLists);
  }, []);

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  const resetBoard = () => {
    setLists([]);
  };

  const addList = () => {
    const title = prompt("Enter list title");
    if (title) {
      setLists([...lists, { id: Date.now(), title, cards: [] }]);
    }
  };

  return (
    <div>
      <Header resetBoard={resetBoard} />
      <button
        onClick={addList}
        className="fixed bottom-4 right-4 bg-green-500 text-white py-4 px-8 rounded shadow-lg hover:bg-green-600 transition-all duration-300"
      >
        Add New List
      </button>

      <div className="flex overflow-x-auto py-6 space-x-4 scrollbar-hide">
        {lists.map((list) => (
          <List key={list.id} list={list} setLists={setLists} />
        ))}
      </div>
    </div>
  );
};

export default Board;
