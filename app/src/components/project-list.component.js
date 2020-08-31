import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProjectsDataService from "../services/projects.service";

import AddProject from "./add-project.component"
import Project from "./project.component"

export default class ProjectsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchProject = this.onChangeSearchProject.bind(this);
        this.retrieveProjects = this.retrieveProjects.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveProject = this.setActiveProject.bind(this);
        this.removeAllProjects = this.removeAllProjects.bind(this);
        this.searchProject = this.searchProject.bind(this);
        
        this.state = {
            projects: [],
            currentProject: null,
            currentIndex: -1,
            searchProject: ""
        };
    }
    
    componentDidMount() {
        this.retrieveProjects();
    }
    
    onChangeSearchProject(e) {
        const searchProject = e.target.value;
        
        this.setState({
            searchProject: searchProject
        });
    }
    
    retrieveProjects() {
        ProjectsDataService.getAll()
          .then(response => {
            this.setState({
                projects: response.data
            });
            console.log(response.data)
          })
          .catch(e => {
            console.log(e);
          });
    }
    
    refreshList() {
        this.retrieveProjects();
        this.state({
            currentProject: null,
            currentIndex: -1
        });
    }
    
    setActiveProject(project, index) {
        this.setState({
            currentProject: project,
            currentIndex: index
        });
    }
    
    removeAllProjects() {
        ProjectsDataService.deleteAll()
          .then(response => {
            console.log(response.data)
          })
          .catch(e => {
            console.log(e);
          });
    }
    
    searchProject() {
        ProjectsDataService.findByTitle(this.state.searchProject)
          .then(response => {
            this.setState({
                projects: response.data
            });
          })
          .catch(e => {
            console.log(e);
          });
    }

    render() {
        const { searchProject, projects, currentProject, currentIndex } = this.state;
        
        return (
            <Router>
                <div className="list row">
                    <div className="col-md-8">
                        <div className="input-group mb-3">
                            <input
                              className="form-control"
                              placeholder="Search by title"
                              value={searchProject}
                              onChange={this.onChangeSearchProject}
                            />
                            <div className="input-group-append">
                              <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchProject}
                              >
                                Search
                              </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h4>Projects List</h4>
                            <Link to={"/add"} className="btn btn-primary btn-lg">
                                <i className="fa fa-plus"></i>
                                Create Project
                            </Link>

                        <ul className="list-group">
                        {projects &&
                            projects.map((project, index) => (
                              <li 
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveProject(project, index)}
                                key={index}
                              >
                                {project.project_name}
                              </li>
                        ))}
                        </ul>
                        <button
                            className="m-3 btn btn-sm btn-danger"
                            onClick={this.removeAllProjects}
                        >
                            Remove All
                        </button>
                    </div>
                    <div className="col-md-6">
                        {currentProject ? (
                            <div>
                               <h4>Project</h4>
                               <div>
                                <label>
                                    <strong>Project Name:</strong>
                                </label>{" "}
                                {currentProject.project_name} 
                               </div>
                               <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {currentProject.team}
                               </div>
                               
                               <Link
                                to={"/projects/" + currentProject.id}
                                className="badge badge-warning"
                               >
                                Edit
                               </Link>
                            </div>
                        ) : (
                            <div>
                                <br />
                                <p>Please click on a project...</p>
                            </div>
                        )}
                    </div>
                </div>
                <Switch>
                    <Route exact path="/" component={ProjectsList} />
                    <Route exact path="/add" component={AddProject} />
                    <Route path="/projects/:id" component={Project} />
                </Switch>
            </Router>
        )
    }
}
