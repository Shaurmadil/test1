"use client";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { createUserResult } from "@/actions";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useSnackbar } from "notistack";

const App = () => {
  const [listItems, setListItems] = useState([
    { id: "1", number: 1, title: "Шаурма (Shwarma)" },
    { id: "2", number: 2, title: "Піца на вугіллі (Pizza on Charcoal)" },
    { id: "3", number: 3, title: "Вареники з картоплею (Potato Vareniki)" },
    { id: "4", number: 4, title: "Лагман (Lagman)" },
    { id: "5", number: 5, title: "Медовик (Medovik)" },
    { id: "6", number: 6, title: "Оладки (Oladky)" },
    { id: "7", number: 7, title: "Холодний Рамен (Cold Ramen)" },
    { id: "8", number: 8, title: "Тайські роли (Thai Rolls)" },
    { id: "9", number: 9, title: "Індійські самоси (Indian Samosas)" },
    { id: "10", number: 10, title: "Самса (Samsa)" },
  ]);

  const [userName, setUserName] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const copyTodos = [...listItems];
    const [reorderTodo] = copyTodos.splice(startIndex, 1);
    copyTodos.splice(endIndex, 0, reorderTodo);
    setListItems(copyTodos);
  };

  const handleSubmit = async () => {
    try {
      await createUserResult({ userResults: listItems, userName });

      enqueueSnackbar("Ваші відповіді успішно відправлені", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Введенні дані не коректні", { variant: "error" });
    }
  };

  return (
    <div
      style={{
        width: "70%",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: 50,
        paddingBottom: 50,
      }}
    >
      <Input
        variant="bordered"
        size="sm"
        className="mb-2"
        placeholder="Введіть своє ім'я"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <ul
              className=" flex flex-col"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {listItems.map((elem, index) => {
                return (
                  <Draggable key={elem.id} draggableId={elem.id} index={index}>
                    {(provided) => (
                      <li
                        className="p-3 mb-2 rounded-md text-white bg-sky-600 text-lg font-bold"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <p className=" flex gap-3">
                          <span> {elem.number}</span>
                          <span> {elem.title}</span>
                        </p>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <Button
        color="primary"
        onClick={handleSubmit}
        className="mt-4"
        variant="shadow"
      >
        Відправити
      </Button>
    </div>
  );
};

export default App;
