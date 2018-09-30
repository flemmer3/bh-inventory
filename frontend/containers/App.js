import React, {Component} from 'react';
import Entry from "./Entry.js";

export default class App extends Component
{
    render() 
    {
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
        };

        return <div className="container">
            <h3 className="text-center mt-4">Task Submitted by Aryoman Patel</h3>
            <Entry title="Current" data={data} readOnly={true}/>
            <Entry title="Updated" data={data} readOnly={false}/>
            <div className="mt-5">
                <div className="text-center">
                    <button type="button" className="btn btn-danger mr-4">REJECT</button>
                    <button type="button" className="btn btn-success">APPROVE</button>
                </div>
            </div>
        </div>;
    }
}