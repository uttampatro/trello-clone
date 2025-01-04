import React, { useState } from 'react';
import Card from '../Card';

const List = ({ list, setLists }) => {
  const [newCardTitle, setNewCardTitle] = useState("");

  const addCard = () => {
    if (newCardTitle) {
      const updatedList = { ...list, cards: [...list.cards, { id: Date.now(), title: newCardTitle }] };
      setLists(prevLists => prevLists.map(l => (l.id === list.id ? updatedList : l)));
      setNewCardTitle("");
    }
  };

  const deleteList = () => {
    if (window.confirm("Are you sure you want to delete this list?")) {
      setLists(prevLists => prevLists.filter(l => l.id !== list.id));
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg p-4 w-64">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold">{list.title}</h2>
        <button onClick={deleteList} className="text-red-500">Delete</button>
      </div>
      <div>
        {list.cards.map(card => (
          <Card key={card.id} card={card} setLists={setLists} listId={list.id} />
        ))}
      </div>
      <div className="mt-2">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Add a new card"
          value={newCardTitle}
          onChange={(e) => setNewCardTitle(e.target.value)}
        />
        <button onClick={addCard} className="bg-blue-500 text-white py-2 px-4 rounded mt-2 w-full">
          Add Card
        </button>
      </div>
    </div>
  );
};

export default List;
