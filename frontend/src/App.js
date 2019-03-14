import React, { Component } from 'react';
import Header from './components/header.js';
import Form from './components/form.js';
import List from './components/list.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container border border-danger" style={{height:"800px", background:"#FDF8F9"}}>
          <div className="row">
            <Header />
          </div>
          <div className="row mt-4">
            <List />
            <Form />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
