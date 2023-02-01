import React, { useState, useCallback } from "react";
import EditTodoNote from "../EditTodoNote";

import "./TodoNote.scss";

const TodoNote = ({ handleClose, selectedTodo, handleTodoEdit }) => {
  const [isEdit, setIsEdit] = useState(false);

  const onChangePress = (todo) => {
    setIsEdit(!isEdit);
    handleTodoEdit(todo);
  };

  const hanldeCancelPress = () => {
    setIsEdit(!isEdit);
  };

  const addLeadingZero = (d) => {
    return d < 10 ? "0" + d : d;
  };

  const getUserTime = (time = new Date()) => {
    const YEAR = time.getFullYear();
    const MONTH = addLeadingZero(time.getMonth() + 1);
    const DAY = addLeadingZero(time.getDate());
    const HOURS = addLeadingZero(time.getHours());
    const MINUTES = addLeadingZero(time.getMinutes());
    return `${YEAR}.${MONTH}.${DAY} ${HOURS}:${MINUTES}`;
  };

  const getComplateText = useCallback(() => {
    const currentDate = new Date().getTime();
    const diffDays = getDiffDays(selectedTodo.date.seconds, currentDate);
    const displayDate = getUserTime(new Date(selectedTodo.date.seconds * 1000));

    if (diffDays === 0) {
      return (
        <div className="todo-note__date-complate_term-expires">
          {displayDate}
          <span className="todo-note__complate-title">
            Срок выполнения задачи скоро истечет
          </span>
        </div>
      );
    }

    if (diffDays > 0) {
      return (
        <div className="todo-note__date-complate_overdue">
          {displayDate}
          <span className="todo-note__complate-title">
            Задача просрочена на {diffDays} дней
          </span>
        </div>
      );
    }

    return <div className="todo-note__date-complate">{displayDate}</div>;
  }, [selectedTodo?.date]);

  const getDiffDays = (date1, date2) => {
    const date = date1 * 1000;
    let days = (date2 - date) / 86400000; //86400000ms в одном дне
    return Math.round(days);
  };

  return (
    <div className="todo-note">
      {isEdit ? (
        <EditTodoNote
          onChangePress={onChangePress}
          selectedTodo={selectedTodo}
          hanldeCancelPress={hanldeCancelPress}
        />
      ) : (
        <div className="todo-note-wrapper">
          <p className="todo-note__task-title">Название задачи</p>
          <div className="todo-note__title">{selectedTodo.title}</div>
          <p className="todo-note__task-description">Описание задачи</p>
          <div className="todo-note__description">
            {selectedTodo.description}
          </div>
          <p className="todo-note__task-calendar">Дата выполнения задачи</p>
          {getComplateText()}
          {selectedTodo.selectedFileUrl && (
            <>
              <p className="todo-note__img-title">Прикрепленные файлы</p>
              <div className="todo-note__img-container">
                <img
                  className="todo-note__img"
                  src={selectedTodo.selectedFileUrl}
                  alt="img"
                ></img>
              </div>
            </>
          )}
          <button
            className="todo-note__edit-button"
            onClick={() => setIsEdit(!isEdit)}
          >
            Изменить
          </button>
        </div>
      )}
      <button onClick={() => handleClose()} className="todo-note__button-close">
        &times;
      </button>
    </div>
  );
};

export default TodoNote;
