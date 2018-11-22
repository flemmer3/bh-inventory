import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';

import { simpleAction } from "../../actions/simpleAction";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button onClick={this.simpleAction}>Test Redux Action</button>
          <pre>{JSON.stringify(this.props)}</pre>
        </header>
      </div>
    );
  }

  simpleAction = (event) => {
      this.props.simpleAction();
  }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    simpleAction: () => dispatch(simpleAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
