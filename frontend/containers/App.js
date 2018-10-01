import React, {Component} from 'react';
import Entry from "./Entry.js";
import $ from 'jquery';

export default class App extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            task: null,
        };
    }

    componentWillMount()
    {
        this.retrieveTask();
    }

    retrieveTask()
    {
        const API_URL = "https://script.google.com/macros/s/AKfycbw1BY9k1wS9AU4-DH-HQ-Onbrqyf2hY0833t8urXMZAFGJppxTz/exec";
        const API_KEY = "zns-test";
        $.getJSON(API_URL, {key: API_KEY}, (data) => {
            this.setState({task: data});
        });
    }

    render() 
    {
        // let data = {
        //     task: {
        //         member: "Aryoman Patel",
        //         row: 277
        //     },
        //     current: {
        //         row: 314,
        //         id: "3118009W",
        //         code: 5,
        //         user: "",
        //         notes: "It's good",
        //         description: "hp Pavilion dm3",
        //         value: 500
        //     },
        //     updated: {
        //         code: 5,
        //         notes: "It's good\n9/28/18, Its good.",
        //         description: "hp Pavilion dm3",
        //         value: 500,
        //     }
        // };
        if(this.state.task === null)
        {
            return <p>Retrieving the next task...</p>;
        }

        return <div className="container">
            <h3 className="text-center mt-4">Task Submitted by {this.state.task.task.member}</h3>
            <Entry title="Current" data={this.state.task} readOnly={true}/>
            <Entry title="Updated" data={this.state.task} readOnly={false}/>
            <div className="mt-5">
                <div className="text-center">
                    <button type="button" className="btn btn-danger mr-4">REJECT</button>
                    <button type="button" className="btn btn-success">APPROVE</button>
                </div>
            </div>
        </div>;
    }
}