import React, { useState } from "react";
import Card from "../Card";
import { Droppable } from "react-beautiful-dnd";

const List = ({ list, setLists,  }) => {
  const [newCardTitle, setNewCardTitle] = useState("");

  const addCard = () => {
    if (newCardTitle) {
      const updatedList = {
        ...list,
        cards: [
          ...list.cards,
          { id: Date.now().toString(), title: newCardTitle },
        ],
      };
      setLists((prevLists) =>
        prevLists.map((l) => (l.id === list.id ? updatedList : l))
      );
      setNewCardTitle("");
    }
  };

  const deleteList = () => {
    if (window.confirm("Are you sure you want to delete this list?")) {
      setLists((prevLists) => prevLists.filter((l) => l.id !== list.id));
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg p-4 w-64">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold">{list.title}</h2>
        <button onClick={deleteList} className="text-red-500 hover:underline">
          Delete
        </button>
      </div>

      <Droppable droppableId={list.id} type="card">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2"
          >
            {list.cards.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                setLists={setLists}
                listId={list.id}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow-md">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Enter card title..."
          required
          value={newCardTitle}
          onChange={(e) => setNewCardTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addCard();
            }
          }}
        />
        <button
          onClick={addCard}
          className="bg-blue-500 text-white font-medium py-3 px-6 rounded-md mt-3 w-full hover:bg-blue-600 transition duration-300 shadow"
        >
          Add Card
        </button>
      </div>
    </div>
  );
};

export default List;
