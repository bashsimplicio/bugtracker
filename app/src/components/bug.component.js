import React, { Component } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";
import { status, priority, severity } from "./data.js";

import BugDataService from "../services/bugs.service";
import ProjectsDataService from "../services/projects.service";

export default class Bug extends Component {
    constructor(props) {
        super(props);
        this.onChangeBugName = this.onChangeBugName.bind(this);
        this.handleChangeSeverity = this.handleChangeSeverity.bind(this);
        this.onChangeBugDetail = this.onChangeBugDetail.bind(this);
        this.handleChangePriority = this.handleChangePriority.bind(this);
        this.handleChangeProject = this.handleChangeProject.bind(this);
        this.onChangeDevice = this.onChangeDevice.bind(this);
        this.onChangeBrowser = this.onChangeBrowser.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleChangeDateReported = this.handleChangeDateReported.bind(this);
        this.retrieveProjects = this.retrieveProjects.bind(this);
        this.getBug = this.getBug.bind(this);
        this.updateBug = this.updateBug.bind(this);
        this.deleteBug = this.deleteBug.bind(this);
        
        this.state = {
            projects: [],
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
            message: ""
        };
    }
    
    componentDidMount() {
        this.getBug(this.props.match.params.id);
        this.retrieveProjects();
    }
    
    onChangeBugName(e) {
        const bug_name = e.target.value;
        
        this.setState(function(prevState) {
            return {
                currentBug: {
                    ...prevState.currentBug,
                    bug_name: bug_name
                }
            };
        });
    }

    handleChangeSeverity(e) {
        const severity = e.value;
        console.log(severity);
        
        this.setState(function(prevState) {
            return {
                currentBug: {
                    ...prevState.currentBug,
                    severity: severity
                }
            };
        });
    }    

    onChangeBugDetail(e) {
        const bug_detail = e.target.value;
        
        this.setState(function(prevState) {
            return {
                currentBug: {
                    ...prevState.currentBug,
                    bug_detail: bug_detail
                }
            };
        });
    }

    handleChangePriority(e) {
        const priority = e.value;
        
        this.setState(function(prevState) {
            return {
                currentBug: {
                    ...prevState.currentBug,
                    priority: priority
                }
            };
        });
    }

    handleChangeProject(e) {
        const project_id = e.value;
        
        this.setState(function(prevState) {
            return {
                currentBug: {
                    ...prevState.currentBug,
                    project_id: project_id
                }
            };
        });
    }

    onChangeDevice(e) {
        const device = e.target.value;
        
        this.setState(function(prevState) {
            return {
                currentBug: {
                    ...prevState.currentBug,
                    device: device
                }
            };
        });
    }

    onChangeBrowser(e) {
        const browser = e.target.value;
        
        this.setState(function(prevState) {
            return {
                currentBug: {
                    ...prevState.currentBug,
                    browser: browser
                }
            };
        });
    }

    handleChangeStatus(e) {
        const status = e.value;
        
        this.setState(function(prevState) {
            return {
                currentBug: {
                    ...prevState.currentBug,
                    status: status
                }
            };
        });
    }

    handleChangeDateReported(date) {
        date = moment(date).format("MM-DD-YYYY")
        const date_reported = date;
        
        this.setState(function(prevState) {
            return {
                currentBug: {
                    ...prevState.currentBug,
                    date_reported: date_reported
                }
            };
        });
        console.log(date_reported);
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

    updateBug() {
        BugDataService.update(
            this.state.currentBug.id,
            this.state.currentBug
        )
          .then(response => {
            console.log(response.data);
            this.setState({
                message: "The bug was updated successfully!"
            });
          })
          .catch(e => {
            console.log(e);
            console.log(this.state.currentBug.id)
          });
    }
    
    deleteBug() {
        BugDataService.delete(this.state.currentBug.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/bugs')
            })
            .catch(e => {
                console.log(e);
            });
    } 

    render() {
        const { currentBug } = this.state;
        const projectOptions = this.state.projects.map(project => ({
                "value": project.id,
                "label": project.project_name,
        }))

        
        return (
            <div>
                {currentBug ? (
                    <div className="edit-form">
                        <h4>Bug</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="bug_name">Bug Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="bug_name"
                                value={currentBug.bug_name}
                                onChange={this.onChangeBugName}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="severity">Severity</label>
                            <Select 
                                options={severity} 
                                value={severity.find(severity => severity.value === currentBug.severity)}
                                onChange={this.handleChangeSeverity} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bug_detail">Bug Detail</label>
                            <input
                                type="text"
                                className="form-control"
                                id="bug_detail"
                                value={currentBug.bug_detail}
                                onChange={this.onChangeBugDetail}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="priority">Priority</label>
                            <Select 
                                options={priority} 
                                value={priority.find(priority => priority.value === currentBug.priority)}
                                onChange={this.handleChangePriority} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="project">Project</label>
                            <Select 
                                placeholder="Select Project..."
                                options={projectOptions}
                                value={projectOptions.find(project_id => project_id.value === currentBug.project_id)}
                                onChange={this.handleChangeProject} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="device">Device</label>
                            <input
                                type="text"
                                className="form-control"
                                id="device"
                                value={currentBug.device}
                                onChange={this.onChangeDevice}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="browser">Browser</label>
                            <input
                                type="text"
                                className="form-control"
                                id="browser"
                                value={currentBug.browser}
                                onChange={this.onChangeBrowser}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <Select 
                                options={status} 
                                value={status.find(status => status.value === currentBug.status)}
                                onChange={this.handleChangeStatus} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="date_reported">Date Reported</label>
                            <DatePicker 
                                value={currentBug.date_reported}
                                selected={this.state.date_reported} 
                                onChange={this.handleChangeDateReported}
                                minDate={new Date()}
                            />

                        </div>
                    </form>
                    <button
                        className="badge badge-danger mr-2"
                        onClick={this.deleteBug}
                    >
                        Delete
                    </button>
                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={this.updateBug}
                    >
                        Update
                    </button>
                    <p>{this.state.message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p> Please click on a bug... </p>
                </div>
            )}
        </div>
        );
    }
}
