import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BugDataService from "../services/bugs.service";

import Bug from "./bug.component"
import AddBug from "./add-bug.component"
    

export default class BugsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchBug = this.onChangeSearchBug.bind(this);
        this.retrieveBugs = this.retrieveBugs.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveBug = this.setActiveBug.bind(this);
        this.removeAllBugs = this.removeAllBugs.bind(this);
        this.searchBug = this.searchBug.bind(this);
        
        this.state = {
            bugs: [],
            currentBug: null,
            currentIndex: -1,
            searchBug: ""
        };
    }
    
    componentDidMount() {
        this.retrieveBugs();
    }
    
    onChangeSearchBug(e) {
        const searchBug = e.target.value;
        
        this.setState({
            searchBug: searchBug
        });
    }
    
    retrieveBugs() {
        BugDataService.getAll()
            .then(response => {
                this.setState({
                    bugs: response.data
                });
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }
    
    refreshList() {
        this.retrieveBugs();
        this.state({
            currentBug: null,
            currentIndex: -1
        });
    }
    
    setActiveBug(bugs, index) {
        this.setState({
            currentBug: bugs,
            currentIndex: index
        });
    }
    
    removeAllBugs() {
        BugDataService.deleteAll()
            .then(response => {
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }
    
    searchBug() {
        BugDataService.findByTitle(this.state.searchBug)
            .then(response => {
                this.setState({
                    bugs: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }
    
    render() {
        const { searchBug, bugs, currentBug, currentIndex } = this.state;
        
        return (
            <Router>
                <div className="list row">
                    <div className="col-md-8">
                        <div className="input-group mb-3">
                            <input
                                className="form-control"
                                placeholder="Search by bug name"
                                value={searchBug}
                                onChange={this.onChangeSearchBug}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={this.searchBug}
                                >
                                Search
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h4>Bugs List</h4>
                            <Link to={"/addbug"} className="btn btn-primary btn-lg">
                                <i className="fa fa-plus"></i>
                                Create Bug 
                            </Link>
                        <ul className="list-group">
                        {bugs &&
                            bugs.map((bug, index) => (
                                <li 
                                  className={
                                    "list-group-item" +
                                    (index === currentIndex ? "active" : "")
                                  }
                                  onClick={() => this.setActiveBug(bug, index)}
                                  key={index}
                                >
                                    {bug.bug_name}
                                </li>
                        ))}
                        </ul>
                        <button 
                            className="m-3 btn btn-sm btn-danger"
                            onClick={this.removeAllBugs}
                        >
                            Remove All 
                        </button>
                    </div>
                    <div className="col-md-6">
                        {currentBug ? (
                            <div>
                                <h4>Bug</h4>
                                <div>
                                    <label>
                                        <strong>Bug Name: </strong>
                                    </label>{" "}
                                    {currentBug.bug_name}
                                </div>
                                <div>
                                    <label>
                                        <strong>Severity: </strong>
                                    </label>{" "}
                                    {currentBug.severity}
                                </div>
                                
                                <Link
                                    to={"/bugs/" + currentBug.id}
                                    className="badge badge-warning"
                                >
                                    Edit
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <br />
                                <p>Please click on a bug...</p>
                            </div>
                        )}
                    </div>
                </div>
                <Switch>
                    <Route exact path="/" component={BugsList} />
                    <Route exact path="/addbug" component={AddBug} />
                    <Route path="/bugs/:id" component={Bug} />
                </Switch>
            </Router>
        )
    }
}
