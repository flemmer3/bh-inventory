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

    colorClass(current, updated, validation=null)
    {
        if(validation !== null && !validation.test(updated + "")) return "text-danger";
        if(current + "" === updated + "" || this.props.readOnly) return "";
        return "text-primary";
    }

    changeColor(name, current, updated, validation=null)
    {
        var newState = {};
        newState[name + "Color"] = this.colorClass(current, updated, validation);
        this.setState(newState);
    }

    render() 
    {
        let nonEditStyle = this.props.readOnly ? {} : {
            borderTopStyle: "solid",
            borderColor: "transparent",
            paddingTop: "0.375rem",
        };

        const fields = {
            code: /^(-?[1-4]{1})$|^[50]{1}$/, // is a valid status code
            notes: null, 
            description: null, 
            value: /^([0-9]+(\.[0-9]+)?)?$/, // is a number
        };
        let inputs = {};
        for(let field in fields)
        {
            let updated = this.props.readOnly ? this.props.data.current[field] : this.props.data.updated[field];
            inputs[field] = <Input 
                name={field}
                readOnly={this.props.readOnly}
                current={this.props.data.current[field]}
                updated={updated}
                changeColor={this.changeColor.bind(this)}
                color={this.state[field + "Color"]}
                validation={fields[field]}
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