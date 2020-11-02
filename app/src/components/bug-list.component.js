import React, { Component } from "react";
import { Link } from "react-router-dom";
import BugDataService from "../services/bugs.service";


    

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
            <div className="container">
              <div className="row">
                  <div className="p-2">
                      <h2> Bugs </h2>
                  </div>
                  <div className="p-2">
                    <Link to={"/addbug"} className="btn btn-primary btn-lg" tabindex="-1" role="button" aria-disabled="true">
                          Create Bug
                    </Link>
                  </div>
              </div>
      
              <div className="container">
                <div className="row containerHeader">
                  <div className="col-4">
                    Bug
                  </div>
                  <div className="col-3">
                    Type
                  </div>
                  <div className="col">
                    Action
                  </div>
              </div>
                    <ul className="list-group">
                    
                    { bugs && bugs.map((bug, index) =>
                        (
                            <li className="list-group-item containerList">
                            <div className="row">
                                    <div className="col-4">
                                        {bug.bug_name}
                                    </div>
                                    
                                    <div className="col-3">
                                        <span className="badge badge-danger">{bug.severity}</span>
                                    </div>
                                    <div className="col col-lg-2">
                                        <Link
                                            to={"/bugs/edit/" + bug.id}
                                            className="badge badge-warning"
                                        >
                                            Edit
                                        </Link> &nbsp;
                                        <Link
                                            to={"/bugs/view/" + bug.id + "/" + bug.project_id}
                                            className="badge badge-success"
                                        >
                                            View
                                        </Link>
                                    </div>
                            </div>
                            </li>
                        )
                    )}
                    </ul>
                </div>
             </div>    
        );             
    }
}

