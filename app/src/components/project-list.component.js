import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProjectsDataService from "../services/projects.service";


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
            <div className="container">
              <div className="row">
                  <div className="p-2">
                      <h2> Projects </h2>
                  </div>
                  <div className="p-2">
                    <Link to={"/projects/addproject"} className="btn btn-primary btn-lg" tabindex="-1" role="button" aria-disabled="true">
                          Create Project
                    </Link>
                  </div>
              </div>
      
              <div className="container">
                <div className="row containerHeader">
                  <div className="col-4">
                    Project
                  </div>
                  <div className="col-3">
                    Team
                  </div>
                  <div className="col">
                    Action
                  </div>
              </div>
                    <ul className="list-group">
                    
                    { projects && projects.map((project, index) =>
                        (
                            <li className="list-group-item containerList">
                            <div className="row">
                                    <div className="col-4">
                                        {project.project_name}
                                    </div>
                                    
                                    <div className="col-3">
                                        <span className="badge badge-danger">{project.team}</span>
                                    </div>
                                    <div className="col-5">
                                        <Link
                                            to={"/projects/edit/" + project.id}
                                            className="badge badge-warning"
                                        >
                                            Edit
                                        </Link>&nbsp;
                                        <Link
                                            to={"/projects/view/" + project.id}
                                            className="badge badge-success"
                                        >
                                            View
                                        </Link>
                                    </div>
                            </div>
                            </li>
                        )
                    )}
                    </ul>
                </div>
             </div>  
        )
    }
}
