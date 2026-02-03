import React from 'react'

class PriceInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ticketPrice : this.props.ticketPrice
        }
    }

    render(){
        return(
            <div>
                <h3>This is a Price Info</h3>
                <p>The Ticket Price : { this.props.ticketPrice }</p>
                
            </div>
        )
    }

}

export default PriceInfo