import React, {Component} from 'react';

export default class Entry extends Component
{
    render() 
    {
        let editStyle = this.props.readOnly ? {} : {
            borderStyle: "dotted",
            padding: "0.375rem",
            outline: "none",
        };
        let nonEditStyle = this.props.readOnly ? {} : {
            borderTopStyle: "solid",
            borderColor: "transparent",
            paddingTop: "0.375rem",
        };

        return <div class="row mt-4">
                <h4>{this.props.title} Entry:</h4>
                <table class="table">
                    <tr>
                        <th>Device ID</th>
                        <th>Code</th>
                        <th>User</th>
                        <th class="text-primary">Notes</th>
                        <th>Description</th>
                        <th>Value</th>
                    </tr>
                    <tr>
                        {/* <td><div style={{paddingTop: "0.375rem"}}>3118009W</div></td>
                        <td><input type="text" readOnly={this.props.readOnly} class="form-control text-center" maxlength="1" size="1" value="5"/></td>
                        <td><div style={{paddingTop: "0.375rem"}}>{"RESERVED\nT32"}</div></td>
                        <td><textarea readOnly={this.props.readOnly} class="form-control text-primary" rows="3">{"9/24/18: Its good."}</textarea></td>
                        <td><textarea readOnly={this.props.readOnly} class="form-control text-center" rows="3">hp Pavilion dm3</textarea></td>
                        <td><input readOnly={this.props.readOnly} type="text" class="form-control text-center" value="$500" size="6"/></td> */}
                        <td><div style={nonEditStyle}>3118009W</div></td>
                        <td><div contentEditable={!this.props.readOnly} style={editStyle}>5</div></td>
                        <td><div style={nonEditStyle}>{"RESERVED\nT32"}</div></td>
                        <td class="text-primary"><div contentEditable={!this.props.readOnly} style={editStyle}>{"9/24/18: Its good."}</div></td>
                        <td><div contentEditable={!this.props.readOnly} style={editStyle}>{"hp Pavilion dm3"}</div></td>
                        <td><div contentEditable={!this.props.readOnly} style={editStyle}>{"$500"}</div></td>
                    </tr>
                </table>
        </div>;
    }
}