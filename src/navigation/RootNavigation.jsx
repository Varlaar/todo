import { LayoutComponent } from "../components";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Notepad from "../pages/Notepad";
import Info from "../pages/Info";

export const RootNavigation = () => {
  return (
    <LayoutComponent>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notepad" element={<Notepad />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </LayoutComponent>
  );
};
