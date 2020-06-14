import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import logo from './logo.svg';
// import './App.css';
import "./css/bootstrap.css"
import "./css/styles.css"


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

class App extends Component {
    render () {
      return (
       <Router>
        <div class="container">
          <div class="row">
            <div class="p-2">
                <h2> Bugs </h2>
            </div>
            <div class="p-2">
                <a href="/bugs" class="btn btn-primary btn-lg" tabindex="-1" role="button" aria-disabled="true">
                      <i class="fa fa-plus"></i>
                      Create Bug
                </a>
            </div>
          </div>
        </div>
      </Router>
      );
    }
}

export default App;
