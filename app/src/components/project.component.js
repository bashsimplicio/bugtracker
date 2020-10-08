import React, { Component } from "react";
import ProjectsDataService from "../services/projects.service";

export default class Project extends Component {
    constructor(props) {
        super(props);
        this.onChangeProjectName = this.onChangeProjectName.bind(this);
        this.onChangeTeam = this.onChangeTeam.bind(this);
        this.getProject = this.getProject.bind(this);
        this.updateProject = this.updateProject.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        
        this.state = {
            currentProject: {
                id: null, 
                project_name: "",
                team: "",
            },
            message: ""
        }; 
    }
    
    componentDidMount() {
        this.getProject(this.props.match.params.id);
    }
    
    onChangeProjectName(e) {
        const project_name = e.target.value;
        console.log(project_name);
        
        this.setState(function(prevState) {
            return {
                currentProject: {
                    ...prevState.currentProject,
                    project_name: project_name
                }
            };
        });
    }
    
    onChangeTeam(e) {
        const team = e.target.value;
        
        this.setState(prevState => ({
            currentProject: {
                ...prevState.currentProject,
                team: team
            }
        }));
    }

    getProject(id) {
        ProjectsDataService.get(id)
          .then(response => {
            this.setState({
              currentProject: response.data
            });
            console.log(response.data);
            console.log("response date from getproject");
          })
          .catch(e => {
            console.log(e);
          });
    }
    
    updateProject() {
        ProjectsDataService.update(
            this.state.currentProject.id,
            this.state.currentProject
        )
          .then(response => {
            console.log(response.data);
            this.setState({
                message: "The project was updated successfully!"
            });
          })
          .catch(e => {
            console.log(e);
            console.log(this.state.currentProject.id);
          });
    }
    
    deleteProject() {
        ProjectsDataService.delete(this.state.currentProject.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/projects')
            })
            .catch(e => {
                console.log(e);
            });
    }
    
    render() {
        const { currentProject } = this.state;
        
        return (
            <div>
              {currentProject ? (
                <div className="edit-form">
                  <h4>Project</h4>
                  <form>
                    <div className="form-group">
                      <label htmlFor="project_name">Project Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="project_name"
                        value={currentProject.project_name}
                        onChange={this.onChangeProjectName}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="team">Team</label>
                      <input
                        type="text"
                        className="form-control"
                        id="team"
                        value={currentProject.team}
                        onChange={this.onChangeTeam}
                      />
                    </div>
                  </form>
                  
                  <button
                    className="badge badge-danger mr-2"
                    onClick={this.deleteProject}
                  >
                    Delete
                  </button>
                  <button
                    type="submit"
                    className="badge badge-success"
                    onClick={this.updateProject}
                  >
                    Update 
                  </button>
                  <p>{this.state.message}</p>
                </div>
            ) : (
              <div>
                <br />
                <p>Please click on a project...</p>
              </div>
              )}
            </div>
        );
    }
}
