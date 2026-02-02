import React from 'react';
import AddFlight from "./components/AddFlight";
import EditFlight from "./components/EditFlight";
import FlightList from "./components/FlightList";
import {Route, Routes, Link} from "react-router-dom";
import './App.css';
 
function App() {
  return (
    <div>
      <h2> Flight Management Portal</h2>
 
      <nav>
        <Link to="/"> Flights </Link>
        <Link to="/add"> Add Flight </Link>
      </nav>
 
      <Routes>
         <Route path="/" element={<FlightList />} />
         <Route path="/add" element={<AddFlight />} />
         <Route path="/edit/:id" element={<EditFlight />} />
      </Routes>
    </div>
  );
}
 
export default App;