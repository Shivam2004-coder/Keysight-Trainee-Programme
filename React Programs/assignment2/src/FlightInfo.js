import React from 'react'
import RouteInfo from './RouteInfo';

class FlightInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            airlineName : this.props.airlineName,
            airlineCode : this.props.airlineCode,
            seats : this.props.seats
        }
    }



    render(){
        return(
            <div>
                <h3>This is a flight info. </h3>
                <p>Airline Name : { this.state.airlineName } </p>
                <p>Airline Code : { this.state.airlineCode } </p>
                <p>Seats : { this.state.seats } </p>
                
                <RouteInfo sourceCity="Delhi" destinationCity="Gurgaon" />
                
            </div>
        )
    }
}

export default FlightInfo