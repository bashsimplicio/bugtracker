import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProjectDataService from "../services/projects.service";

export default class AddProject extends Component {
    constructor(props) {
        super(props);
        this.onChangeProjectName = this.onChangeProjectName.bind(this);
        this.onChangeTeam = this.onChangeTeam.bind(this);
        this.saveProject = this.saveProject.bind(this);
        this.newProject = this.newProject.bind(this);
        
        this.state = {
            id: null,
            project_name: "",
            team: "",
            
            submitted: false
        }
    }
    
    onChangeProjectName(e) {
        this.setState({
            project_name: e.target.value
        });
    }
    
    onChangeTeam(e) {
        this.setState({
            team: e.target.value
        });
    }
    
    saveProject() {
        var data = {
            project_name: this.state.project_name,
            team: this.state.team
        };
        
        ProjectDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    project_name: response.data.project_name,
                    team: response.data.team,
                    
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    newProject() {
        this.setState({
            id: null,
            project_name: "",
            team: "",
            
            submitted: false
        });
    }
    
    render() {
        return (
        <div className="container">
            <div className="submit-form">
                <h2> Add a Project </h2>
                {this.state.submitted ? (
                    <div>
                        <h4> You submitted successfully! </h4>
                        <button className="btn btn-success" onClick={this.newProject}>
                            Add
                        </button>
                    </div>
                ) : (
                  <div className="container">
                    <div className="form-group row">
                        <label htmlFor="project_name" className="col-sm-2 col-form-label">Project Name:</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control"
                                id="project_name"
                                required
                                value={this.state.project_name}
                                onChange={this.onChangeProjectName}
                                name="project_name"
                            />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="team" className="col-sm-2 col-form-label">Assigned Team:</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control"
                                id="team"
                                required
                                value={this.state.team}
                                onChange={this.onChangeTeam}
                                name="team"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2"></div>
                        <div className="form-group col-sm-10">
                            <Link to={"/projects"} className="btn btn-primary btn-lg" role="button" aria-disabled="true" onClick={this.saveProject}>
                              Submit
                            </Link>&nbsp;
                            <Link to={"/projects"} className="btn btn-outline-secondary btn-lg" role="button" aria-disabled="true">
                              Cancel
                            </Link>
                        </div>
                    </div>
                  </div>
                )}
            </div>
        </div>
        );
    }
}
