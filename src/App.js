import { RootNavigation } from "./navigation/RootNavigation";
import React from "react";

import "./App.scss";

function App() {
  return (
    <div className="wrapper">
      <div className="content">
        <RootNavigation />
      </div>
    </div>
  );
}

export default App;

