import React, { Component } from "react";
import { Link } from "react-router-dom";
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
    console.log(e.target.value)

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
          currentProject: response.data[0]
        });
        console.log(response.data);
        console.log(this.currentProject);
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
        this.props.history.push('/projects')
        this.setState({
          message: "The project was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
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
            <h2>Edit Project</h2>
            <form>
                <div className="container">
                  <div className="form-group row">
                    <label htmlFor="project_name" className="col-sm-2 col-form-label">Project Name</label>
                    <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          id="project_name"
                          value={currentProject.project_name}
                          onChange={this.onChangeProjectName}
                        />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="team" className="col-sm-2 col-form-label">Team</label>
                    <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          id="team"
                          value={currentProject.team}
                          onChange={this.onChangeTeam}
                        />
                    </div>
                  </div>
                </div>
            </form>
            <div className="row">
                <div className="col-sm-2"></div>
                <div className="form-group col-sm-10">
                    <Link to={"/projects"} className="btn btn-primary badge-secondary" role="button" aria-disabled="true">
                        Cancel
                    </Link>  &nbsp;                 

                    <button
                      type="submit"
                      className="btn btn-primary badge-success"
                      onClick={this.updateProject}
                    >
                      Update
                    </button>
                </div>
            </div>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Project...</p>
          </div>
        )}
      </div>
    );
  }
}
