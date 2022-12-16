import React from "react";
import Header from "../Header";

import "./LayoutComponent.scss";

const LayoutComponent = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="container">{children}</div>
    </div>
  );
};

export default LayoutComponent;
