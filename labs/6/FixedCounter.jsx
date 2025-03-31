import React, { Component } from 'react';

class FixedCounter extends Component {
  constructor ( props ) {
    super( props );
    this.state = {
      count: 0,
    };
  }

  increment () {
    this.setState(
      ( prevState ) => ({
        count : prevState.count + 1
      })
    );
  }

  decrement () {
    this.setState(
      ( prevState ) => ({
        count : prevState.count - 1
      })
    );
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
    return (
      <div>
        <h1>Fixed Counter</h1>
        <button onClick={ () => this.handleClick( 'increment' ) }>Increment</button>
        <button onClick={ () => this.handleClick( 'decrement' ) }>Decrement</button>
        <p>Current count: {this.state.count}</p>
      </div>
    );
  }
}

export default FixedCounter;