import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProjectsDataService from "../services/projects.service";


export default class ProjectsView extends Component {
    constructor(props) {
        super(props);
        this.getProject = this.getProject.bind(this);
        
        this.state = {
          currentProject: {
            id: null,
            project_name: "",
            team: "",
          },
        };
    }
    componentDidMount() {
        this.getProject(this.props.match.params.id);
        
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

    refreshList() {
        this.retrieveProjects();
        this.state({
            currentProject: null,
            currentIndex: -1
        });
    }


    render() {
        const { currentProject, currentIndex } = this.state;
        return (
            <div className="container">
                <div className="row row-cols-2">
                    <div className="col-7">
                        <div>
                            <h2>{ currentProject.project_name } </h2>
                            <h5>{ currentProject.team }</h5>
                        </div>
                    </div>                
                </div>
            </div>
            
        );
    }
}
