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
            this.props.changeColor(
                this.props.name, 
                this.state.valueCurrent, 
                editorState.getCurrentContent().getPlainText(),
                this.props.validation,
                this.props.error,
            );
        };
    }

    render() 
    {
        let editStyle = this.props.readOnly ? {} : {padding: "0.375rem"};
        let borderClass = this.props.readOnly ? "" : this.props.color.replace("text", "border") + " border rounded ";

        return <div className={borderClass + this.props.color} style={editStyle}>
            <Editor readOnly={this.props.readOnly} editorState={this.state.value} onChange={this.valueEdit}/>
        </div>;
    }
}