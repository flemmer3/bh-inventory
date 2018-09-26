import React, {Component} from 'react';
import Entry from "./Entry.js";

export default class App extends Component
{
    render() 
    {
        return <div class="container">
            <h3 class="text-center mt-4">Task Submitted by Aryoman Patel</h3>
            <Entry title="Updated" readOnly={true}/>
            <Entry title="Updated" readOnly={false}/>
            <div class="mt-5">
                <div class="text-center">
                    <button type="button" class="btn btn-danger mr-4">REJECT</button>
                    <button type="button" class="btn btn-success">APPROVE</button>
                </div>
            </div>
        </div>;
    }
}