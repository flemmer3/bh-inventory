import React, {Component} from 'react';

export default class App extends Component
{
    render() 
    {
        return <div class="container">
            <h3 class="text-center mt-4">Task Submitted by Aryoman Patel</h3>
            <div class="row mt-4">
                <h4>Old Entry:</h4>
                <table class="table">
                    <tr>
                        <th>Device ID</th>
                        <th>Code</th>
                        <th>User</th>
                        <th>Notes</th>
                        <th>Description</th>
                        <th>Value</th>
                        <th>Receiver</th>
                    </tr>
                    <tr>
                        <td>3118009W</td>
                        <td>5</td>
                        <td>RESERVED<br/>T32</td>
                        <td></td>
                        <td>hp Pavilion dm3</td>
                        <td>$500</td>
                        <td></td>
                    </tr>
                </table>
            </div>
            <div class="row mt-4">
                <h4>Updated Entry:</h4>
                <table class="table">
                    <tr>
                        <th>Device ID</th>
                        <th>Code</th>
                        <th>User</th>
                        <th class="text-danger">Notes</th>
                        <th>Description</th>
                        <th>Value</th>
                        <th>Receiver</th>
                    </tr>
                    <tr>
                        <td>3118009W</td>
                        <td><input type="text" class="form-control" maxlength="1" size="1" value="5"/></td>
                        <td>RESERVED<br/>T32</td>
                        <td class="text-danger"><textarea class="form-control text-danger" id="exampleFormControlTextarea1" rows="3">{"9/24/18: Its good."}</textarea></td>
                        <td><textarea class="form-control" id="exampleFormControlTextarea1" rows="3">hp Pavilion dm3</textarea></td>
                        <td><input type="text" class="form-control" value="$500" size="6"/></td>
                        <td><input type="text" class="form-control" value="" size="8"/></td>
                    </tr>
                </table>
            </div>
            <div class="mt-5">
                <div class="text-center">
                    <button type="button" class="btn btn-danger mr-4">REJECT</button>
                    <button type="button" class="btn btn-success">APPROVE</button>
                </div>
            </div>
        </div>;
    }
}