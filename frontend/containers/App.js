import React, {Component} from 'react';

export default class App extends Component
{
    render() 
    {
        return <div>
            <table>
                <tr>
                    <th>Device ID</th>
                    <th>Code</th>
                    <th>User</th>
                    <th>Notes</th>
                    <th>Description</th>
                    <th>Receiver</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>3118009W</td>
                    <td>5</td>
                    <td>RESERVED<br/>T32</td>
                    <td></td>
                    <td>hp Pavilion dm3</td>
                    <td></td>
                    <td>$500</td>
                </tr>
            </table>
        </div>;
    }
}