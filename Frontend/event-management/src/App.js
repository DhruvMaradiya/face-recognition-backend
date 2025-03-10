import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// React router dom

import Home from "./pages/Home"; //~ home page
import CreateEvent from "./pages/CreateEvent"; //~ create event page
import Navbar from "./components/Navbar"; //~ navbar component
import EventDetails from "./components/EventDetails"; //~ event details component
import StudentsList from "./pages/StudentsList"; //~ students list page
import StudentDetails from "./pages/StudentDetails"; //~ student details page



function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar component */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/admin/event/:id" element={<EventDetails />} />
        <Route path="/students" element={<StudentsList />} />
        <Route path="/student/:id" element={<StudentDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
