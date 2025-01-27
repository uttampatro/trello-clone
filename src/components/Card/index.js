import React, { useState } from "react";
import Modal from "../Modal";
import { Draggable } from "react-beautiful-dnd";

const Card = ({ card, setLists, listId, index }) => {
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
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <div
            className="bg-white p-4 mt-4 rounded shadow cursor-pointer overflow-hidden"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => setShowModal(true)}
          >
            <div className="flex justify-between items-center">
              <h3 className="truncate max-w-[calc(100%-60px)]">{card.title}</h3>
            </div>
          </div>
        )}
      </Draggable>
      {showModal && (
        <Modal
          deleteCard={deleteCard}
          card={card}
          setLists={setLists}
          listId={listId}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export default Card;
