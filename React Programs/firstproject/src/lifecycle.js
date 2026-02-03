import React from "react";

class Music extends React.Component{

    constructor(props){
        super(props);
        this.state={
            instrument : this.props.instrument
        }
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({instrument: "Piano"});
        } , 3000);
    }

    shouldComponentUpdate(){
        return true;
    }

    change(){
        this.setState({instrument : "Piano"});
    }

    getSnapshotBeforeUpdate(prevProps , prevState){
        document.getElementById("c1").innerHTML = "Previous Instrument is " + prevState.instrument;
    }

    componentDidUpdate(){
        document.getElementById("c2").innerHTML = "The updated Instrument is " + this.state.instrument;
    }

    render(){
        return(
            <div>
                <h2>I know how to play this { this.state.instrument } instrument </h2>
                <button type="button" onClick={() => this.change()} >Change Instrument</button>
                <div id="c1"></div>
                <div id="c2"></div>
            </div>
        )
    }
}

class ComponentWillUnmount extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show : true
        }
    }

    render(){
        return (
            <div>
                <p>{ this.state.show ? <Child /> : null }</p>
                <button onClick={() => {
                    this.setState({show : !this.state.show})
                }} >
                    Toggle
                </button>
            </div> 
        )
    }
}

class Child extends React.Component{
    componentWillUnmount(){
        alert("Component is Unmounting");
    }

    render(){
        return(
            <h2>I am a Child Component !</h2>
        )
    }
}

export default ComponentWillUnmount;