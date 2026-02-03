import React from 'react'
import ReactDOM from 'react-dom/client';

class ShoppingComponent extends React.Component{
    render(){
        return(
            <div>
                <h1>Shopping Component</h1>
                <Product name="Magna 10X" price="3500" brand="Titan"
                         mname="LG10 34" mprice="4500"
                />
            </div>
        )
    }
}

class Product extends React.Component{
    render(){
        return(
            <div>
                <h2>List of Products </h2>
                <li>
                    <ul><Watch name={this.props.name} price={this.props.price} brand={this.props.brand} /></ul>
                    <ul><MicroWave name={this.props.mname} price={this.props.mprice} /></ul>
                </li>
            </div>
        )
    }
}
class Watch extends React.Component{
    render(){
        return(
            <div>
                <h3>List of Watch </h3>
                <ul>
                    <li><p>Product name : { this.props.name }</p></li>
                    <li><p>Product price : { this.props.price }</p></li>
                    <li><p>Product brand : { this.props.brand }</p></li>
                </ul>
            </div>
        )
    }
}
class MicroWave extends React.Component{
    render(){
        return(
            <div>
                <h3>List of MicroWave </h3>
                <ul>
                    <li><p>Product name : { this.props.name }</p></li>
                    <li><p>Product price : { this.props.price }</p></li>
                </ul>
            </div>
        )
    }
}

export default ShoppingComponent;