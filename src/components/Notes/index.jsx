import React from "react";
import { getTodoTime } from "../../utils/getTodoTime";
import attachedFile from "../../assets/img/attachedFile.png";
import description from "../../assets/img/description.png";

import "./Notes.scss";

const Notes = ({
  todos,
  handleTodoClick,
  handleTodoDelete,
  handleTodoComplete,
}) => {

  return (
    <ul className="notelist">
      {todos.map((todo) => (
        <li className="note" key={todo.id}>
          <div className="left-column">
            <input
              className="left-column__checkbox"
              type="checkbox"
              checked={todo.completed ? "checked" : ""}
              onChange={() => handleTodoComplete(todo)}
            />
            <div>
              <span className="left-column__title">{todo.title}</span>
              <div className="left-column__flex">
                {todo.description && (
                  <img
                    src={description}
                    className="left-column__description"
                    alt=""
                  />
                )}
                {todo.selectedFileUrl && (
                  <img
                    src={attachedFile}
                    alt=""
                    className="left-column__attached-file"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="right-column">
            <p className="right-column__date-title">
              {getTodoTime(new Date(todo.date.seconds * 1000))}
            </p>
            <button
              className="right-column__view-button"
              onClick={() => handleTodoClick(todo)}
            >
              &#128065;
            </button>
            <button
              className="right-column__delete-button"
              onClick={() => handleTodoDelete(todo.id)}
            >
              &times;
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Notes;
