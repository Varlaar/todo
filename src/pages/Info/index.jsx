import React from "react";

import "./index.scss";

const Info = () => {
  return (
    <div className="info">
      <div className="info__title">О приложении</div>
      <div className="info__subtitle">
        <p>Приложение находится в разработке</p>
        <p className="info__subtitle version">Версия приложения 1.0</p>
      </div>
    </div>
  );
};

export default Info;
