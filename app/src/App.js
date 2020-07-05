import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import logo from './logo.svg';
// import './App.css';
import "./css/bootstrap.css"
import "./css/styles.css"

import AddProject from "./components/add-project.component"
import Project from "./components/project.component"
import ProjectsList from "./components/project-list.component"


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

// class App extends Component {
//     render () {
//       return (
//        <Router>
//         <div className="container">
//           <div className="row">
//             <div className="p-2">
//                 <h2> Bugs </h2>
//             </div>
//             <div className="p-2">
//                 <a href="/bugs" className="btn btn-primary btn-lg" tabIndex="-1" role="button" aria-disabled="true">
//                       <i className="fa fa-plus"></i>
//                       Create Bug
//                 </a>
//             </div>
//           </div>
//         </div>
//       </Router>
//       );
//     }
// }

// export default App;


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/projects" className="navbar-brand">
              b2a2
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/projects"} className="nav-link">
                  Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add Project
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/projects"]} component={ProjectsList} />
              <Route exact path="/add" component={AddProject} />
              <Route path="/projects/:id" component={Project} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
