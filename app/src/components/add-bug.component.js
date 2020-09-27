import React, { Component } from "react";
import Select from "react-select";

import { status, priority, severity } from "./data.js";
import BugDataService from "../services/bugs.service";


export default class AddBug extends Component {
    constructor(props) {
        super(props);
        this.onChangeBugName = this.onChangeBugName.bind(this);
        this.handleChangeSeverity = this.handleChangeSeverity.bind(this);
        this.onChangeBugDetail = this.onChangeBugDetail.bind(this);
        this.handleChangePriority = this.handleChangePriority.bind(this);
        this.onChangeProject = this.onChangeProject.bind(this);
        this.onChangeDevice = this.onChangeDevice.bind(this);
        this.onChangeBrowser = this.onChangeBrowser.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.onChangeDateReported = this.onChangeDateReported.bind(this);
        this.saveBug = this.saveBug.bind(this);
        this.newBug = this.newBug.bind(this);
        
        this.state = {
            id: null,
            bug_name: "",
            severity: "",
            bug_detail: "",
            priority: "",
            project_id: null,
            device: "",
            browser: "",
            status: "",
            date_reported: "",
            
            submitted: false
        }        
    }
    
    onChangeBugName(e) {
        this.setState({
            bug_name: e.target.value
        });
    }

    handleChangeSeverity(e) {
        this.setState({
            selectedSeverity: e
        });
    }    

    onChangeBugDetail(e) {
        this.setState({
            bug_detail: e.target.value
        });
    }

    handleChangePriority(e) {
        this.setState({
            selectedPriority: e
        });
    }

    onChangeProject(e) {
        this.setState({
            project_id: e.target.value
        });
    }

    onChangeDevice(e) {
        this.setState({
            device: e.target.value
        });
    }

    onChangeBrowser(e) {
        this.setState({
            browser: e.target.value
        });
    }

    handleChangeStatus(e) {
        this.setState({
            selectedStatus: e
        });
    }

    onChangeDateReported(e) {
        this.setState({
            date_reported: e.target.value
        });
    }
    
    saveBug() {
        var data = {
            bug_name: this.state.bug_name,
            severity: this.state.selectedSeverity,
            bug_detail: this.state.bug_detail,
            priority: this.state.selectedPriority,
            project_id: this.state.project_id,
            device: this.state.device,
            browser: this.state.browser,
            status: this.state.selectedStatus,
            date_reported: this.state.date_reported
        };
        
        BugDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    bug_name: response.data.bug_name,
                    severity: response.data.severity,
                    priority: response.data.priority,
                    project_id: response.data.project_id,
                    device: response.data.device,
                    browser: response.data.browser,
                    status: response.data.status,
                    date_reported: response.data.date_reported,
                    
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    
    newBug() {
        this.setState({
            id: null,
            bug_name: "",
            severity: "",
            bug_detail: "",
            priority: "",
            project_id: null,
            device: "",
            browser: "",
            status: "",
            date_reported: "",
            
            submitted: false
        });
    }
    
    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4> You submitted successfully! </h4>
                        <button className="btn btn-success" onClick={this.newBug}>
                            Add 
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="bug_name">Bug Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="bug_name"
                                required
                                value={this.state.bug_name}
                                onChange={this.onChangeBugName}
                                name="bug_name"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="severity">Severity</label>
                            <Select 
                                options={severity} 
                                value={this.state.selectedSeverity} 
                                onChange={this.handleChangeSeverity}
                                defaultValue={severity[3]} />

                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="bug_detail">Bug Detail</label>
                            <input
                                type="text"
                                className="form-control"
                                id="bug_detail"
                                required
                                value={this.state.bug_detail}
                                onChange={this.onChangeBugDetail}
                                name="bug_detail"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="priority">Priority</label>
                            <Select 
                                options={priority} 
                                value={this.state.selectedPriority} 
                                onChange={this.handleChangePriority}
                                defaultValue={priority[3]} />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="project_id">Project</label>
                            <input
                                type="text"
                                className="form-control"
                                id="project_id"
                                required
                                value={this.state.project_id}
                                onChange={this.onChangeProject}
                                name="project_id"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="device">Device</label>
                            <input
                                type="text"
                                className="form-control"
                                id="device"
                                required
                                value={this.state.device}
                                onChange={this.onChangeDevice}
                                name="device"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="browser">Browser</label>
                            <input
                                type="text"
                                className="form-control"
                                id="browser"
                                required
                                value={this.state.browser}
                                onChange={this.onChangeBrowser}
                                name="browser"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <Select 
                                options={status} 
                                value={this.state.selectedStatus} 
                                onChange={this.handleChangeStatus}
                                defaultValue={status[0]} />

                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="date_reported">Date Reported</label>
                            <input
                                type="text"
                                className="form-control"
                                id="date_reported"
                                required
                                value={this.state.date_reported}
                                onChange={this.onChangeDateReported}
                                name="date_reported"
                            />
                        </div>
                        <button onClick={this.saveBug} className="btn btn-success">
                            Submit 
                        </button>
                    </div>
                )}
            </div>
        );
    }   
}
