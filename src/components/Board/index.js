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
      <div className="flex overflow-x-auto py-6 space-x-4">
        {lists.map((list) => (
          <List key={list.id} list={list} setLists={setLists} />
        ))}
      </div>
      <button
        onClick={addList}
        className="bg-green-500 text-white py-4 px-8 rounded"
      >
        Add New List
      </button>
    </div>
  );
};

export default Board;
