import React from 'react'
import FlightInfo from './FlightInfo';

class App extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="App">
          <h1>Assignment 2</h1>
          <FlightInfo airlineName="Indigo" airlineCode="123" seats="1A" />
      </div>
    );
  }
}

export default App;
