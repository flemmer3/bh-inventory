import React, {Component} from 'react';
import Entry from "./Entry.js";
import $ from 'jquery';

const API_URL = "https://script.google.com/macros/s/AKfycbw1BY9k1wS9AU4-DH-HQ-Onbrqyf2hY0833t8urXMZAFGJppxTz/exec";
const API_KEY = "zns-test";

export default class App extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            task: null,
            status: "Retrieving the next task... Hello World!",
            code: "",
            notes: "",
            description: "",
            value: "",
        };
    }

    componentWillMount()
    {
        this.retrieveTask();
    }

    retrieveTask()
    {
        $.getJSON(API_URL, {key: API_KEY}, (data) => {
            if(data.status === "error" && data.message === "no new tasks")
            {
                this.setState({task: null, status: "No new tasks. Refresh the page to check again."});
            }
            else
            {
                console.log(data);
                this.setState({
                    task: data,
                    code: {
                        value: data.updated.code,
                        error: null,
                    },
                    notes: {
                        value: data.updated.notes,
                        error: null,
                    },
                    description: {
                        value: data.updated.description,
                        error: null,
                    },
                    value: {
                        value: data.updated.value,
                        error: null,
                    },
                });
            }
        });
    }

    updateEdits(key, value, error)
    {
        let newState = {};
        newState[key] = {value: value, error: error};
        this.setState(newState);
    }

    displayError(message)
    {
        alert(message);
    }

    approveEdits()
    {
        const editedFields = ["code", "notes", "description", "value"];
        let postData = {
            key: API_KEY,
            accepted: true,
            // request: "update",
            taskRow: this.state.task.task.row,
            deviceRow: this.state.task.current.row,
            deviceID: this.state.task.current.id,
        };
        for(let i = 0; i < editedFields.length; i++)
        {
            if(this.state[editedFields[i]].error !== null)
            {
                this.displayError(this.state[editedFields[i]].error);
                return false;    
            }
            postData[editedFields[i]] = this.state[editedFields[i]].value;
        }
        this.postEditsAPI(postData);
    }

    denyEdits()
    {
        let postData = {
            key: API_KEY, 
            accepted: false, 
            // request: "update",
            taskRow: this.state.task.task.row,
        };
        this.postEditsAPI(postData);
    }

    postEditsAPI(postData)
    {
        let response = (data) => {
            console.log("loaded");
            this.setState({status: "Retrieving the next task..."});
            this.retrieveTask();
        };

        this.setState({task: null, status: "Updating spreadsheet..."});

        $.ajax({
            url: API_URL,
            data: postData,
            type: "POST",
            dataType: "json",
            success: response,
            error: response,
        });
    }
      
    render() 
    {
        if(this.state.task === null)
        {
            return <p>{this.state.status}</p>;
        }

        return <div className="container">
            <h3 className="text-center mt-4">Task Submitted by {this.state.task.task.member}</h3>
            <Entry title="Current" data={this.state.task} readOnly={true} updateEdits={this.updateEdits.bind(this)}/>
            <Entry title="Updated" data={this.state.task} readOnly={false} updateEdits={this.updateEdits.bind(this)}/>
            <div className="mt-5">
                <div className="text-center">
                    <button type="button" className="btn btn-danger mr-4" onClick={this.denyEdits.bind(this)}>REJECT</button>
                    <button type="button" className="btn btn-success" onClick={this.approveEdits.bind(this)}>APPROVE</button>
                </div>
            </div>
        </div>;
    }
}

/*
let getData = {
    key: zns-test,
    request: "update"
    accepted: true,
    taskRow: 277,
    deviceRow: 314,
    deviceID: "3118009W",
    code: "5",
    notes: "It's good\n9/28/18, Its good.",
    description: "hp Pavilion dm3",
    value: "500",
}*/

/*
let data = {
    task: {
        member: "Aryoman Patel",
        row: 277
    },
    current: {
        row: 314,
        id: "3118009W",
        code: 5,
        user: "",
        notes: "It's good",
        description: "hp Pavilion dm3",
        value: 500
    },
    updated: {
        code: 5,
        notes: "It's good\n9/28/18, Its good.",
        description: "hp Pavilion dm3",
        value: 500,
    }
};*/