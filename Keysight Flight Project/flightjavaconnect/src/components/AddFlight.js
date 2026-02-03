import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddFlight = () => {

   const [flightName, setFlightName] = useState("");
   const [source, setSource] = useState("");
   const [destination, setDestination] = useState("");
   const [price, setPrice] = useState("");
   const [distance, setDistance] = useState("");
   const [carrier, setCarrier] = useState("");
   const [tailnum, setTailnum] = useState("");
   const [depTime, setDepTime] = useState("");
   const [arrTime, setArrTime] = useState("");
   const [airTime, setAirTime] = useState("");

   const navigate = useNavigate();  // used for the navigation purpose

   const saveFlight = async (e) => {
      e.preventDefault();

      const flight = { flightName, source, destination, price, distance, carrier, tailnum, depTime, arrTime, airTime }

      //  await fetch("http://localhost:8080/flights/add", {   // calling the Spring boot Java API of project "FirstBootExample"
      await fetch("http://localhost:6161/add/flight", {   // calling the Spring boot Java API of project "FirstBootExample"
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(flight)
      });

      navigate("/");
   }

   return (
      <div className="container mt-5" style={{ maxWidth: '800px' }}>
         <h3 className="mb-4 font-weight-bold text-center" style={{ color: 'var(--accent-primary)' }}>Add New Flight</h3>

         <div className="glass-panel p-4">
            <form onSubmit={saveFlight}>
               <div className="row">
                  <div className="col-md-6 mb-3">
                     <label className="text-secondary font-weight-bold">Flight Name</label>
                     <input className="glass-input" value={flightName} onChange={e => setFlightName(e.target.value)} required />
                  </div>
                  <div className="col-md-6 mb-3">
                     <label className="text-secondary font-weight-bold">Price ($)</label>
                     <input type="number" className="glass-input" value={price} onChange={e => setPrice(e.target.value)} required />
                  </div>
               </div>

               <div className="row">
                  <div className="col-md-6 mb-3">
                     <label className="text-secondary font-weight-bold">Source</label>
                     <input className="glass-input" value={source} onChange={e => setSource(e.target.value)} required />
                  </div>
                  <div className="col-md-6 mb-3">
                     <label className="text-secondary font-weight-bold">Destination</label>
                     <input className="glass-input" value={destination} onChange={e => setDestination(e.target.value)} required />
                  </div>
               </div>

               <div className="row">
                  <div className="col-md-4 mb-3">
                     <label className="text-secondary font-weight-bold">Carrier</label>
                     <input className="glass-input" value={carrier} onChange={e => setCarrier(e.target.value)} />
                  </div>
                  <div className="col-md-4 mb-3">
                     <label className="text-secondary font-weight-bold">Tail Number</label>
                     <input className="glass-input" value={tailnum} onChange={e => setTailnum(e.target.value)} />
                  </div>
                  <div className="col-md-4 mb-3">
                     <label className="text-secondary font-weight-bold">Distance (miles)</label>
                     <input type="number" className="glass-input" value={distance} onChange={e => setDistance(e.target.value)} />
                  </div>
               </div>

               <div className="row">
                  <div className="col-md-4 mb-3">
                     <label className="text-secondary font-weight-bold">Departure Time</label>
                     <input className="glass-input" value={depTime} onChange={e => setDepTime(e.target.value)} />
                  </div>
                  <div className="col-md-4 mb-3">
                     <label className="text-secondary font-weight-bold">Arrival Time</label>
                     <input className="glass-input" value={arrTime} onChange={e => setArrTime(e.target.value)} />
                  </div>
                  <div className="col-md-4 mb-3">
                     <label className="text-secondary font-weight-bold">Air Time (mins)</label>
                     <input className="glass-input" value={airTime} onChange={e => setAirTime(e.target.value)} />
                  </div>
               </div>

               <div className="text-center mt-4">
                  <button type="submit" className="btn btn-premium px-5 py-2">Save Flight</button>
               </div>
            </form>
         </div>
      </div>
   )
}

export default AddFlight;