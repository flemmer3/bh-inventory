import React, {Component} from 'react';
import Input from "./Input.js";

export default class Entry extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            codeColor: this.colorClass(this.props.data.current.code, this.props.data.updated.code),
            notesColor: this.colorClass(this.props.data.current.notes, this.props.data.updated.notes),
            descriptionColor: this.colorClass(this.props.data.current.description, this.props.data.updated.description),
            valueColor: this.colorClass(this.props.data.current.value, this.props.data.updated.value),
        };
    }

    colorClass(current, updated)
    {
        if(current + "" === updated + "" || this.props.readOnly) return "";
        return "text-primary";
    }

    changeColor(name, current, updated)
    {
        var newState = {};
        newState[name + "Color"] = this.colorClass(current, updated);
        this.setState(newState);
    }

    render() 
    {
        let nonEditStyle = this.props.readOnly ? {} : {
            borderTopStyle: "solid",
            borderColor: "transparent",
            paddingTop: "0.375rem",
        };

        const fields = ["code", "notes", "description", "value"];
        let inputs = {};
        for(let i = 0; i < fields.length; i++)
        {
            let updated = this.props.readOnly ? this.props.data.current[fields[i]] : this.props.data.updated[fields[i]];
            inputs[fields[i]] = <Input 
                name={fields[i]}
                readOnly={this.props.readOnly}
                current={this.props.data.current[fields[i]]}
                updated={updated}
                changeColor={this.changeColor.bind(this)}
                color={this.state[fields[i] + "Color"]}
            />;
        }

        return <div className="row mt-4">
                <h4>{this.props.title} Entry:</h4>
                <table className="table">
                    <tr>
                        <th>Device ID</th>
                        <th className={this.state.codeColor}>Code</th>
                        <th>User</th>
                        <th className={this.state.notesColor}>Notes</th>
                        <th className={this.state.descriptionColor}>Description</th>
                        <th className={this.state.valueColor}>Value</th>
                    </tr>
                    <tr>
                        <td>
                            <div style={nonEditStyle}>{this.props.data.current.id}</div>
                        </td>
                        <td>{inputs.code}</td>
                        <td>
                            <div style={nonEditStyle}>{this.props.data.current.user}</div>
                        </td>
                        <td>{inputs.notes}</td>
                        <td>{inputs.description}</td>
                        <td>{inputs.value}</td>
                    </tr>
                </table>
        </div>;
    }
}