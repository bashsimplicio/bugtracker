import React, { Component } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import { status, priority, severity } from "./data.js";

import BugDataService from "../services/bugs.service";
import ProjectsDataService from "../services/projects.service";


export default class AddBug extends Component {
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
        this.saveBug = this.saveBug.bind(this);
        this.newBug = this.newBug.bind(this);
        
        this.state = {
            id: null,
            projects: [],
            bug_name: "",
            severity: "",
            bug_detail: "",
            priority: "",
            project_id: null,
            device: "",
            browser: "",
            status: "",
            startDate: new Date(),
            
            submitted: false
        }        
    }
    
    componentDidMount() {
        this.retrieveProjects();
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

    handleChangeProject(e) {
        this.setState({
            selectedProject: e
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

    handleChangeDateReported(date) {
        this.setState({
            startDate: date
        });
    }
    
    saveBug() {
        var data = {
            bug_name: this.state.bug_name,
            severity: this.state.selectedSeverity.value,
            bug_detail: this.state.bug_detail,
            priority: this.state.selectedPriority.value,
            project_id: this.state.selectedProject.value,
            device: this.state.device,
            browser: this.state.browser,
            status: this.state.selectedStatus.value,
            date_reported: this.state.startDate
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
        const projectOptions = this.state.projects.map(project => ({
                        "value": project.id,
                        "label": project.project_name,
                }))

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
                    <div className="container">
                        <div>
                            <h2>Create a new bug</h2>
                        </div>
                        <div className="row">
                            <div className="form-group col-sm">
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
                            
                            <div className="form-group col-sm">
                                <label htmlFor="severity">Severity</label>
                                <Select 
                                    placeholder="Select Severity..."
                                    options={severity} 
                                    value={this.state.selectedSeverity} 
                                    onChange={this.handleChangeSeverity} />

                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-sm">
                                <label htmlFor="priority">Priority</label>
                                <Select 
                                    placeholder="Select Priority..."
                                    options={priority} 
                                    value={this.state.selectedPriority} 
                                    onChange={this.handleChangePriority} />
                            </div>
                            
                            <div className="form-group col-sm">
                                <label htmlFor="project_id">Project</label>
                                <Select 
                                    placeholder="Select Project..."
                                    options={projectOptions}
                                    value={this.state.selectedProject}
                                    onChange={this.handleChangeProject} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-sm">
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
                            
                            <div className="form-group col-sm">
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
                        </div>
                        <div className="row">
                            <div className="form-group col-sm">
                                <label htmlFor="status">Status</label>
                                <Select 
                                    placeholder="Select Status..."
                                    options={status} 
                                    value={this.state.selectedStatus} 
                                    onChange={this.handleChangeStatus} />

                            </div>
                            
                            <div className="form-group col-sm">
                                <label htmlFor="date_reported">Date Reported</label>
                                <div>
                                    <DatePicker 
                                        selected={this.state.startDate} 
                                        onChange={this.handleChangeDateReported}
                                        minDate={new Date()}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="form-group col-sm">
                            <label htmlFor="bug_detail">Bug Detail</label>
                            <textarea
                                type="text"
                                className="form-control"
                                id="bug_detail"
                                required
                                value={this.state.bug_detail}
                                onChange={this.onChangeBugDetail}
                                name="bug_detail"
                            />
                        </div>
                        <Link to={"/bugs"} className="btn btn-primary btn-lg" role="button" aria-disabled="true" onClick={this.saveBug}>
                          Submit
                        </Link>&nbsp;
                        <Link to={"/bugs"} className="btn btn-outline-secondary btn-lg" role="button" aria-disabled="true">
                          Cancel
                        </Link>                        

                    </div>
                )}
            </div>
        );
    }   
}
