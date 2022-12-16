import React from "react";

import "./AddFile.scss";

const AddFile = ({ file, onChange, filePicker }) => {
  const handleChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    fileReader.readAsDataURL(file);
  };

  const fileReader = new FileReader();
  fileReader.onloadend = () => {
    onChange(fileReader.result);
  };

  return (
    <>
      <input
        type="file"
        ref={filePicker}
        accept="image/*,.png,.jpeg,.gif,.web,"
        onChange={handleChange}
        className="add-file"
      />
      <img className="img" src={file} alt=""></img>
    </>
  );
};

export default AddFile;
