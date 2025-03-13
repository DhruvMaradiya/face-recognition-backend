// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// // React router dom

// import Home from "./pages/Home"; //~ home page
// import CreateEvent from "./pages/CreateEvent"; //~ create event page
// import Navbar from "./components/Navbar"; //~ navbar component
// import EventDetails from "./components/EventDetails"; //~ event details component
// import StudentsList from "./pages/StudentsList"; //~ students list page
// import StudentDetails from "./pages/StudentDetails"; //~ student details page
// import Footer from "./components/Footer";
// import CalendarView from "./pages/CalendarView";



// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/create" element={<CreateEvent />} />
//         <Route path="/admin/event/:id" element={<EventDetails />} />
//         <Route path="/students" element={<StudentsList />} />
//         <Route path="/student/:id" element={<StudentDetails />} />
//         <Route path="/calendar" element={<CalendarView />} />

//       </Routes>
//       <Footer />
//     </Router>
//   );
// }

// export default App;





import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// // React router dom
import Home from "./pages/Home"; //~ home page
import CreateEvent from "./pages/CreateEvent"; //~ create event page
import Navbar from "./components/Navbar"; //~ navbar component
import EventView from "./components/EventView"; //~ event details component
import EventEdit from "./components/EventEdit"; //~ event details component
import StudentsList from "./pages/StudentsList"; //~ students list page
import StudentDetails from "./pages/StudentDetails"; //~ student details page
import Footer from "./components/Footer";
import CalendarView from "./pages/CalendarView";
import ReportPage from "./pages/Dashboard";
import Dashboard from "./pages/Dashboard";



const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Fixed Navbar */}
        <Navbar />

        {/* Scrollable Main Content */}
        <main className="flex-1 pt-[88px] pb-[104px] bg-gray-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateEvent />} />
            {/* <Route path="/admin/event/:id" element={<EventDetails />} /> */}
            <Route path="/admin/event/:id" element={<EventView />} />
        <Route path="/event/edit/:id" element={<EventEdit />} />
            <Route path="/students" element={<StudentsList />} />
            <Route path="/student/:id" element={<StudentDetails />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/report" element={<Dashboard />}></Route>
          </Routes>
        </main>

        {/* Fixed Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;