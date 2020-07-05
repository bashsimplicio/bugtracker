import React, { Component } from "react";
import BugsDataService from "../services/projects.service";

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
        
        BugsDataService.create(data)
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
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4> You submitted successfully! </h4>
                        <button className="btn btn-success" onClick={this.newProject}>
                            Add
                        </button>
                    </div>
                ) : (
                  <div>
                    <div className="form-group">
                        <label htmlFor="project_name">Project Name</label>
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

                    <div className="form-group">
                        <label htmlFor="team">Team</label>
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
                    <button onClick={this.saveProject} className="btn btn-success">
                        Submit
                    </button>
                  </div>
                )}
            </div>
        );
    }
}
