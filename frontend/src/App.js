import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Details from "./pages/details"; // Details bileşenini içe aktar

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Details />} /> {/* Ana rota */}
      </Routes>
    </Router>
  );
};

export default App;
