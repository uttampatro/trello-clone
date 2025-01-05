import React, { useState } from "react";

const Modal = ({ card, setLists, listId, setShowModal }) => {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || "");
  const [dueDate, setDueDate] = useState(card.dueDate || "");

  const saveChanges = () => {
    setLists((prevLists) => {
      return prevLists.map((list) => {
        if (list.id === listId) {
          const updatedCards = list.cards.map((c) => {
            if (c.id === card.id) {
              return { ...c, title, description, dueDate };
            }
            return c;
          });
          return { ...list, cards: updatedCards };
        }
        return list;
      });
    });
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Edit Card</h2>
        <input
          type="text"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Card Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
        ></textarea>
        <input
          type="date"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={saveChanges}
            className="py-2 px-6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          >
            Save
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="py-2 px-6 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
