import React, { Component } from "react";

import BugDataService from "../services/bugs.service";

export default class Project extends Component {
    constructor(props) {
        super(props);
        this.onChangeBugName = this.onChangeBugName.bind(this);
        this.onChangeSeverity = this.onChangeSeverity.bind(this);
        this.onChangeBugDetail = this.onChangeBugDetail.bind(this);
        this.onChangePriority = this.onChangePriority.bind(this);
        this.onChangeProject = this.onChangeProject.bind(this);
        this.onChangeDevice = this.onChangeDevice.bind(this);
        this.onChangeBrowser = this.onChangeBrowser.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeDateReported = this.onChangeDateReported.bind(this);
        this.getBug = this.getBug.bind(this);
        this.updateBug = this.updateBug.bind(this);
        this.deleteBug = this.deleteBug.bind(this);
        
        this.state = {
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
                date_reported: ""
            },
            message: ""
        };
    }
    
    componentDidMount() {
        this.getBug(this.props.match.params.id);
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

    onChangeSeverity(e) {
        const severity = e.target.value;
        
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

    onChangePriority(e) {
        const priority = e.target.value;
        
        this.setState(function(prevState) {
            return {
                currentBug: {
                    ...prevState.currentBug,
                    priority: priority
                }
            };
        });
    }

    onChangeProject(e) {
        const project_id = e.target.value;
        
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

    onChangeStatus(e) {
        const status = e.target.value;
        
        this.setState(function(prevState) {
            return {
                currentBug: {
                    ...prevState.currentBug,
                    status: status
                }
            };
        });
    }

    onChangeDateReported(e) {
        const date_reported = e.target.value;
        
        this.setState(function(prevState) {
            return {
                currentBug: {
                    ...prevState.currentBug,
                    date_reported: date_reported
                }
            };
        });
    }   

    getBug(id) {
        BugDataService.get(id)
          .then(response => {
            this.setState({
                currentBug: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e)
          });
    }

    updateBug() {
        BugDataService.update(
            this.state.currentBug[0].id,
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
            console.log(this.state.currentBug[0].id)
          });
    }
    
    deleteBug() {
        BugDataService.delete(this.state.currentBug[0].id)
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
                            <input
                                type="text"
                                className="form-control"
                                id="severity"
                                value={currentBug.severity}
                                onChange={this.onChangeSeverity}
                            />
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
                            <input
                                type="text"
                                className="form-control"
                                id="priority"
                                value={currentBug.priority}
                                onChange={this.onChangePriority}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="project">Project</label>
                            <input
                                type="text"
                                className="form-control"
                                id="project_id"
                                value={currentBug.project_id}
                                onChange={this.onChangeProject}
                            />
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
                            <input
                                type="text"
                                className="form-control"
                                id="status"
                                value={currentBug.status}
                                onChange={this.onChangeStatus}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="date_reported">Date Reported</label>
                            <input
                                type="text"
                                className="form-control"
                                id="date_reported"
                                value={currentBug.date_reported}
                                onChange={this.onChangeDateReported}
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
