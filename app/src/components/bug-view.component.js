import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from 'moment';

import { status, priority, severity } from "./data.js";

import BugDataService from "../services/bugs.service";
import ProjectsDataService from "../services/projects.service";

export default class BugView extends Component {
    constructor(props) {
        super(props);
        this.getBug = this.getBug.bind(this);
        this.getProject = this.getProject.bind(this);
        
        this.state = {
            project: "",
            currentBug: {
                id: null,
                bug_name: "",
                severity: "",
                bug_detail: "",
                priority: "",
                project_id: "",
                device: "",
                browser: "",
                status: "",
                date_reported: null
            },
        };
    }
    
    componentDidMount() {
        this.getBug(this.props.match.params.id);
        
        this.getProject(this.props.match.params.project_id);
        console.log(this.props.match.params.project_id);
    }

    getBug(id) {
        BugDataService.get(id)
          .then(response => {
            this.setState({
                currentBug: response.data[0]
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e)
          });
    }
    
    getProject(project_id) {
        ProjectsDataService.get(project_id)
          .then(response => {
            this.setState({
              project: response.data[0]
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    } 

    
    render() {
        const { currentBug, project } = this.state;    
        
        return (
            <div className="container">
                <div className="row row-cols-2">
                    <div className="col-7">
                        <div>
                            <h2>{ currentBug.bug_name }</h2>
                            <h5>Created on {moment(currentBug.date_reported).format("LL")}</h5>
                        </div>
                    </div>
                    <div className="col-7">
                        <div>
                            { currentBug.bug_detail }
                        </div>
                    </div>
                    <div className="col-5">
                        <div> 
                            Project: <Link to={"/projects/view/" + currentBug.project_id}>{ project.project_name }</Link>
                        </div>
                        <div className="sidebarSpacing">
                            Type: <span className="badge badge-danger">{ currentBug.severity }</span>
                        </div>
                        <div className="sidebarSpacing">
                            Priority: <span className="badge badge-danger">{ currentBug.priority }</span>
                        </div>
                        <div className="sidebarSpacing"> 
                            <label for="bugStatus">Status: </label>
                            { currentBug.status } 
                        </div>
                        <div className="sidebarSpacing">
                            Device: { currentBug.device }
                        </div>
                        <div className="sidebarSpacing"> 
                            Browser: { currentBug.browser } 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
