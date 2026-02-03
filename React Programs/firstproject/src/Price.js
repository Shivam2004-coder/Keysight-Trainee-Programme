import React from "react";

class Price extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            price : 5000,
            discount : 50
        }
    }

    changePrice(){
        this.setState({ price : 5000 });
    }

    render(){

        setTimeout(() => {
            this.setState({price : 4000 , discount : 20});
        } ,5000);

        return(
            <div>
                <p>The Price of the component is { this.state.price } </p>
                <p>The discount of the component { this.state.discount } </p>
                <button onClick={ () => this.changePrice() } > update Price </button>
            </div>
        )
    }
}

export default Price;