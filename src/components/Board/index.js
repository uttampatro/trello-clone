import React, { useState, useEffect } from "react";
import Header from "../Header";
import List from "../List";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

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
      setLists([...lists, { id: Date.now().toString(), title, cards: [] }]);
    }
  };

  const onDragEnd = (result) => {
    const { source, destination, type } = result;

    if (!destination) return;
    const sourceList = lists.find((list) => list.id === source.droppableId);
    const destinationList = lists.find(
      (list) => list.id === destination.droppableId
    );

    const [movedCard] = sourceList.cards.splice(source.index, 1);
    destinationList.cards.splice(destination.index, 0, movedCard);

    setLists([...lists]);
  };

  return (
    <div>
      <Header resetBoard={resetBoard} />
      <div className="px-8 py-5">
        <button
          onClick={addList}
          className="fixed bottom-4 right-4 bg-green-500 text-white py-4 px-8 rounded shadow-lg hover:bg-green-600 transition-all duration-300"
        >
          Add New List
        </button>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="board" direction="horizontal" type="list">
            {(provided) => (
              <div
                className="flex overflow-x-auto py-6 space-x-5 scrollbar-hide"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {lists.map((list, index) => (
                  <List
                    key={list.id}
                    list={list}
                    setLists={setLists}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Board;
