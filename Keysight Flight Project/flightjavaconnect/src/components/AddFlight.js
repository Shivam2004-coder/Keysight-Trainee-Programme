import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
 
const AddFlight = () => {
 
    const [flightName, setFlightName] = useState("");
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");  
 
    const navigate = useNavigate();  // used for the navigation purpose
 
    const saveFlight = async (e) =>{
       e.preventDefault();
 
       const flight= {flightName, source, destination}
 
      //  await fetch("http://localhost:8080/flights/add", {   // calling the Spring boot Java API of project "FirstBootExample"
       await fetch("http://localhost:6161/add/flight", {   // calling the Spring boot Java API of project "FirstBootExample"
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(flight)
       });
 
       navigate("/");
    }
 
    return(
         <div>
            <h3> Add Flight </h3>
 
            <form onSubmit={saveFlight}>
               <div>
                <label> Flight Name </label>
                <input value={flightName} onChange={e => setFlightName(e.target.value)} />
               </div>
 
               <div>
                <label> Source </label>
                <input value={source} onChange={e => setSource(e.target.value)} />
               </div>
 
               <div>
                <label> Destination </label>
                <input value={destination} onChange={e => setDestination(e.target.value)} />
               </div>
 
               <button type="submit"> Save </button>
            </form>
         </div>
    )
}
 
export default AddFlight;