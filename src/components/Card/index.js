import React, { useState } from "react";
import Modal from "../Modal";

const Card = ({ card, setLists, listId }) => {
  const [showModal, setShowModal] = useState(false);

  const deleteCard = () => {
    setLists((prevLists) => {
      return prevLists.map((list) => {
        if (list.id === listId) {
          return { ...list, cards: list.cards.filter((c) => c.id !== card.id) };
        }
        return list;
      });
    });
  };

  return (
    <>
      <div
        className="bg-white p-4 mb-2 rounded shadow cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <h3>{card.title}</h3>
      </div>
      {showModal && (
        <Modal
          card={card}
          setLists={setLists}
          listId={listId}
          setShowModal={setShowModal}
        />
      )}
      <button onClick={deleteCard} className="text-red-500 mt-2">
        Delete Card
      </button>
    </>
  );
};

export default Card;
