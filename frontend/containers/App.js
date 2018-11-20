import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Login from "./Login.js";
import Tasks from "./Tasks/Tasks.js";

export default class App extends Component
{     
    render() 
    {
        return(
            <Router>
                <div>
                    <Route exact path="/" component={Login}/>
                    <Route exact path="/tasks" component={Tasks}/>
                </div>
            </Router>
        );
    }
}