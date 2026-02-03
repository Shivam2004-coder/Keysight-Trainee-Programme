import React from 'react'

class AddSub extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            counter : 0
        }
    }

    add(){
        this.setState({counter : this.state.counter + 1});
    }

    sub(){
        this.setState({counter : this.state.counter - 1});
    }

    reset(){
        this.setState({ counter : 0 });
    }

    render(){
        return(
            <div>
                <button onClick={ () => this.add() } > Add </button><br/>
                <button onClick={ () => this.sub() } > Sub </button><br/>
                <button onClick={ () => this.reset() } > Reset </button><br/>
                <p>Counter : { this.state.counter }</p>
            </div>
                    
        )
    }
}

export default AddSub;