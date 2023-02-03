import React, { useState, useRef, useEffect } from "react";
import { useAlert } from "react-alert";
import AddFile from "../AddFile";
import Calendar from "react-calendar";

import "./CreateTodo.scss";

const CreateTodo = ({ handleAddTodo, handleClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [date, setDate] = useState(new Date());
  const [visibleCalendar, setVisibleCalendar] = useState(false);
  const filePicker = useRef(null);
  const alert = useAlert();

  // Сохранение задачи
  const saveTodo = () => {
    if (title.trim().length === 0) {
      alert.show(
        <div className="alert">Внимание! Введите название заметки</div>
      );
    } else {
      handleAddTodo({
        id: new Date().toISOString(),
        title,
        description,
        completed: false,
        selectedFileUrl: file,
        date,
      });
    }
  };

  // Выбор даты выполнения задачи
  const handleChangeShowCalendar = () => {
    setVisibleCalendar(!visibleCalendar);
  };

  // Изменение даты выполнения задачи
  const handleChangeDate = (date) => {
    setDate(date);
  };

  // Изменение прикрепленного файла
  const handleChangeFile = (file) => {
    setFile(file);
  };

  // Добавление нового файла
  const handlePick = () => {
    filePicker.current.click();
  };

  // Удаление прикрепленного файла
  const handleDeleteFile = () => {
    setFile(null);
  };

  // Изменение названия задачи
  const handleChangeTitle = ({ target: { value } }) => {
    setTitle(value);
  };

  // Изменение описания задачи
  const handleChangeDescription = ({ target: { value } }) => {
    setDescription(value);
  };

  useEffect(() => {
    return () => {
      setTitle("");
      setDescription("");
    };
  }, []);

  return (
    <>
      <div className="todo">
        <input
          maxLength={40}
          value={title}
          onChange={handleChangeTitle}
          type="text"
          className="todo__title"
          placeholder="Ведите название задачи"
        />
        <input
          maxLength={500}
          value={description}
          onChange={handleChangeDescription}
          className="todo__description"
          type="text"
          placeholder="Добавить описание задачи"
        />
        {file ? (
          <>
            <button className="todo__pick-file" onClick={handlePick}>
              Изменить фаил
            </button>
            <button className="todo__delete-file" onClick={handleDeleteFile}>
              Удалить фаил
            </button>
            <AddFile
              file={file}
              onChange={handleChangeFile}
              filePicker={filePicker}
            />
          </>
        ) : (
          <>
            <button className="todo__pick-file" onClick={handlePick}>
              Прикрепить фаил
            </button>
            <AddFile
              file={file}
              onChange={handleChangeFile}
              filePicker={filePicker}
            />
          </>
        )}
        {visibleCalendar ? (
          <>
            <button
              onClick={handleChangeShowCalendar}
              className="todo__hide-date"
            >
              Скрыть календарь
            </button>
            <div className="todo__calendar">
              <Calendar
                minDate={new Date()}
                onChange={handleChangeDate}
                value={date}
              />
            </div>
          </>
        ) : (
          <button
            onClick={handleChangeShowCalendar}
            className="todo__pick-date"
          >
            Выбрать дату выполения
          </button>
        )}
        <button className="todo__add-note" onClick={saveTodo}>
          Сохранить заметку
        </button>
        <button className="todo__cancel" onClick={() => handleClose()}>
          Отмена
        </button>
      </div>
    </>
  );
};

export default CreateTodo;
