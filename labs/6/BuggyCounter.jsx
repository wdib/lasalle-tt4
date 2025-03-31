import React, { Component } from 'react';

class BuggyCounter extends Component {
  constructor ( props ) {
    super( props );
    this.state = {
      count : 0,
    };
  }

  increment () {
    this.setState({
      count : this.state.count + 1
    });
  }

  decrement () {
    this.setState({
      count : this.state.count - 1
    });
  }

  handleClick = ( operation ) => {
    if ( operation === 'increment' ) {
      this.increment();
    }
    else {
      this.decrement();
    }
  };

  render () {
    console.log( this.state );  // Debugging state
    return (
      <div>
        <h1>Buggy Counter</h1>
        <button onClick={ () => this.handleClick( 'increment' ) }>Increment</button>
        <button onClick={ () => this.handleClick( 'decrement' ) }>Decrement</button>
        <p>Current count: {this.state.count}</p>
      </div>
    );
  }
}

export default BuggyCounter;