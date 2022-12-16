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

  const getComplateText = useCallback(() => {
    const currentDate = new Date();
    const diffDays = getDiffDays(selectedTodo.date, currentDate);
    const displayDate = selectedTodo.date.toLocaleDateString();

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

  function getDiffDays(date1, date2) {
    const newDate1 = new Date(date1.getTime());
    const newDate2 = new Date(date2.getTime());
    newDate1.setHours(0, 0, 0);
    newDate2.setHours(0, 0, 0);
    const one_day = 1000 * 60 * 60 * 24;

    const date1_ms = newDate1.getTime();
    const date2_ms = newDate2.getTime();

    const difference_ms = date2_ms - date1_ms;

    return Math.round(difference_ms / one_day);
  }

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
