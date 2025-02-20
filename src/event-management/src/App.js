import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import Navbar from "./components/Navbar";
import EventDetails from "./components/EventDetails";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/admin/event/:id" element={<EventDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
