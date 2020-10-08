import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import logo from './logo.svg';
// import './App.css';
import "./css/bootstrap.css"
import "./css/styles.css"

import ProjectsList from "./components/project-list.component"
import Project from "./components/project.component"
import AddProject from "./components/add-project.component"

import BugsList from "./components/bug-list.component"
import Bug from "./components/bug.component"
import AddBug from "./components/add-bug.component"



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
        <div className="container">
          <nav className="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar bg-primary">
            <a className="navbar-brand" href="/">
                <i className="fa fa-bug"></i> 
                  BugTracker
            </a>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to={"/"} className="nav-link">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/projects"} className="nav-link">
                            Projects
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/bugs"} className="nav-link">
                            Bugs
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/reports"} className="nav-link">
                            Reports
                        </Link>
                    </li>
                </ul>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={"/projects"} component={ProjectsList} />
              <Route exact path="/projects/addproject" component={AddProject} />
              <Route path="/projects/:id" component={Project} />
    
              <Route exact path={"/bugs"} component={BugsList} />
              <Route exact path={"/addbug"} component={AddBug} />
              <Route path={"/bugs/:id"} component={Bug} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
