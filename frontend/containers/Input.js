import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import {Editor, EditorState, ContentState} from 'draft-js';
import 'draft-js/dist/Draft.css';

export default class Input extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            valueCurrent: this.props.current + "",
            value: EditorState.createWithContent(
                ContentState.createFromText(
                    this.props.readOnly ? this.props.current + "" : this.props.updated + ""
                )
            ),
        };

        this.valueEdit = (editorState) => {
            this.setState({value: editorState});
            this.props.changeColor(this.props.name, this.state.valueCurrent, editorState.getCurrentContent().getPlainText());
        };
    }

    // colorClass()
    // {
    //     let color = this.state.valueCurrent === this.state.value.getCurrentContent().getPlainText()
    //         ? ""
    //         : "text-primary";
    //     return color;
    // }

    render() 
    {
        let editStyle = this.props.readOnly ? {} : {
            borderStyle: "dotted",
            padding: "0.375rem",
            outline: "none",
        };

        // console.log("new render")

        return <div className={this.props.color} style={editStyle}>
            <Editor readOnly={this.props.readOnly} editorState={this.state.value} onChange={this.valueEdit}/>
        </div>;
    }
}