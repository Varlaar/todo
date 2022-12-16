import React, { useState, useEffect } from "react";
import { Notes } from "../../components";
import { CreateTodo } from "../../components";
import { TodoNote } from "../../components";
import {
  MODE_TODO_VIEW,
  MODE_TODO_EDIT,
  MODE_TODO_ADD,
} from "../../enums/enumTodo";
import { db } from "../../firebase";

import "./index.scss";

const HomePage = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [mode, setMode] = useState(MODE_TODO_VIEW);

  const handleModeChange = (newMode) => setMode(newMode);

  const handleTodoClick = (todo) => {
    setSelectedTodo(todo);
    handleModeChange(MODE_TODO_EDIT);
  };

  const handleAddTodo = (todo) => {
    addDoc(todo);
    setMode(MODE_TODO_VIEW);
  };

  const handleTodoEdit = (todo) => {
    console.log(todo);
    setSelectedTodo(todo);
    setTodos((todos) =>
      todos.map((item) => (item.id === todo.id ? todo : item))
    );
  };

  const handleTodoComplete = (id) => {
    let newTodo = [...todos].map((todo) =>
      todo.id !== id ? todo : { ...todo, completed: !todo.completed }
    );
    setTodos(newTodo);
  };

  const handleTodoDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const getDoc = async () => {
    try {
      const response = db.collection("todos");
      const querySnapshot = await response.get();
      const todos = [];
      querySnapshot.forEach((i) =>
        todos.push({
          ...i.data(),
          documentId: i.id,
        })
      );
      setTodos(todos);
      console.log(todos);
    } catch (error) {
      console.log("Error getting documents: ", error);
    }
  };

  const addDoc = async (todo) => {
    try {
      await db.collection("todos").add(todo);
      getDoc();
      console.log("Document successfully written!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    getDoc();
  }, []);

  return (
    <div className="home">
      {mode === MODE_TODO_VIEW && (
        <div className="create-task">
          <button
            className="create-task__button"
            onClick={() => handleModeChange(MODE_TODO_ADD)}
          >
            + Добавить задачу
          </button>
          <Notes
            todos={todos}
            setTodos={setTodos}
            handleTodoDelete={handleTodoDelete}
            handleTodoClick={handleTodoClick}
            handleTodoComplete={handleTodoComplete}
          />
        </div>
      )}

      {mode === MODE_TODO_ADD && (
        <CreateTodo
          handleAddTodo={(todo) => handleAddTodo(todo)}
          handleClose={() => setMode(MODE_TODO_VIEW)}
        />
      )}

      {mode === MODE_TODO_EDIT && (
        <TodoNote
          handleClose={() => setMode(MODE_TODO_VIEW)}
          selectedTodo={selectedTodo}
          handleTodoEdit={handleTodoEdit}
        />
      )}
    </div>
  );
};

export default HomePage;
