import React from 'react'
import PriceInfo from './PriceInfo';

class RouteInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sourceCity : this.props.sourceCity,
            destinationCity : this.props.destinationCity
        }
    }

    render(){
        return(
            <div>
                <h3>This is a Route Info</h3>
                <p>Souce City : { this.state.sourceCity }</p>
                <p>Destination City : { this.state.destinationCity }</p>

                <PriceInfo ticketPrice="10" />

            </div>
        )
    }

}

export default RouteInfo