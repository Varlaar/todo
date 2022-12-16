import React, { useState, useRef } from "react";
import { useAlert } from "react-alert";
import AddFile from "../AddFile";
import Calendar from "react-calendar";

import "./EditTodoNote.scss";

const EditTodoNote = ({ onChangePress, selectedTodo, hanldeCancelPress }) => {
  const [newTitle, setNewTitle] = useState(selectedTodo.title);
  const [newDescription, setNewDescription] = useState(
    selectedTodo.description
  );
  const [newDate, setNewDate] = useState(selectedTodo.date);
  const [newFile, setNewFile] = useState(selectedTodo.selectedFileUrl);
  const filePicker = useRef(null);
  const alert = useAlert();

  const handleTodoChange = () => {
    if (newTitle.trim().length === 0) {
      alert.show(
        <div style={{ color: "yellow" }}>
          Внимание! Введите название заметки
        </div>
      );
    } else {
      const newTodo = {
        ...selectedTodo,
        title: newTitle,
        description: newDescription,
        date: newDate,
        selectedFileUrl: newFile,
      };
      onChangePress(newTodo);
    }
  };

  const onChangeNewDate = (newDate) => {
    setNewDate(newDate);
  };

  const handleChangeFile = (newFile) => {
    setNewFile(newFile);
  };

  const handleDeleteFile = () => {
    setNewFile(null);
  };

  const handleChangeNewTitle = ({target :{value}}) => {
    const splitValue = value.split("");
    const newTitle = value[0]
      ? value[0].toUpperCase() + splitValue.slice(1).join("")
      : [];
    setNewTitle(newTitle);
  };

  const handleChangeNewDescription = ( {target: { value } }) => {
    setNewDescription(value);
  };

  const handlePick = () => {
    filePicker.current.click();
  };

  return (
    <div className="edit-todo__container">
      <p className="edit-todo__task-title">Название задачи</p>
      <input
        maxLength={40}
        placeholder="Введите название задачи"
        value={newTitle}
        onChange={handleChangeNewTitle}
        className="edit-todo__edit-title"
        type="text"
      />
      <p className="edit-todo__task-description">Описание задачи</p>
      <div>
        <textarea
          rows={12}
          maxLength={500}
          placeholder="Введите описание задачи"
          value={newDescription}
          onChange={handleChangeNewDescription}
          className="edit-todo__edit-description"
          type="text"
        />
      </div>
      <p className="edit-todo__task-calendar">Дата выполнения задачи</p>
      <div className="edit-todo__calendar">
        <Calendar
          minDate={new Date()}
          onChange={onChangeNewDate}
          value={newDate}
        />
      </div>
      {newFile ? (
        <>
          <p className="edit-todo__img-title">Вложенное изображение</p>
          <div>
            <button className="edit-todo__edit-file" onClick={handlePick}>
              Изменить
            </button>
            <button
              className="edit-todo__delete-file"
              onClick={handleDeleteFile}
            >
              Удалить
            </button>
          </div>
          <AddFile
            file={newFile}
            onChange={handleChangeFile}
            filePicker={filePicker}
          />
        </>
      ) : (
        <>
          <p className="edit-todo__img-title">Вложенное изображение</p>
          <button className="edit-todo__pick-file" onClick={handlePick}>
            Прикрепить фаил
          </button>
          <AddFile
            file={newFile}
            onChange={handleChangeFile}
            filePicker={filePicker}
          />
        </>
      )}
      <div>
        <button
          onClick={() => handleTodoChange()}
          className="edit-todo__save-button"
        >
          Сохранить
        </button>
        <button
          onClick={hanldeCancelPress}
          className="edit-todo__cancel-button"
        >
          Отмена
        </button>
      </div>
    </div>
  );
};

export default EditTodoNote;
