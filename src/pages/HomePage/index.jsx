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

  // Изменение текущего режима: просмотр, редактирование или добавление задачи
  const handleModeChange = (newMode) => setMode(newMode);

  // Переход в режим редактирования выбранной задачи
  const handleTodoClick = (todo) => {
    setSelectedTodo(todo);
    handleModeChange(MODE_TODO_EDIT);
  };

  // Создание новой задачи
  const handleAddTodo = (todo) => {
    addDoc(todo);
    setMode(MODE_TODO_VIEW);
  };

  const handleTodoEdit = async (todo) => {
    // try {
    //   await db.collection("todos").doc(todo).update({
    //   });
    //   console.log("Document successfully updated!");
    // } catch (e) {
    //   console.log("Error updating document: ", e);
    // }
    // setTodos((todos) =>
    //   todos.map((item) => (item.id === todo.id ? todo : item))
    // );
    setSelectedTodo(todo);
    console.log("задача изменена", todo);
  };

  // Задача выполнена
  const handleTodoComplete = async (todo) => {
    try {
      await db.collection("todos").doc(todo.id).update({
        completed: !todo.completed,
      });
      console.log("Document successfully updated!");
    } catch (e) {
      console.log("Error updating document: ", e);
    }
  };

  // Удаление задачи
  const handleTodoDelete = (id) => {
    deleteDoc(id);
  };

  // Получение списка задач
  const getDoc = async () => {
    try {
      const response = db.collection("todos");
      const unsubscribe = response.onSnapshot((querySnapshot) => {
        const todos = [];
        querySnapshot.forEach((doc) =>
          todos.push({
            ...doc.data(),
            id: doc.id,
          })
        );
        setTodos(todos);
      });
      return () => unsubscribe();
    } catch (e) {
      console.log("Error getting documents: ", e);
    }
  };

  // Добавление задачи
  const addDoc = async (todo) => {
    try {
      await db.collection("todos").add(todo);
      getDoc();
      console.log("Document successfully written!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // Удаление задачи
  const deleteDoc = async (id) => {
    try {
      await db
        .collection("todos")
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        });
    } catch (e) {
      console.error("Error removing document: ", e);
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
