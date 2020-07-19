import React, { Component } from 'react';
import './style.css'

export default class AddProjectModal extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
        projectName: ''
    };
  }
  handleSubmit(e)
  {
    e.preventDefault(); 
    const wot = true
    //const wot = this.props.isUniqueProject(this.state.projectName);
    if(wot === false)
    {
      alert("Title must be Unique")
      return
    }
    if(this.state.projectName === "")
    {
      alert("Please fill in the fields")
      return
    }
    this.props.addProjectButton();
    this.props.addNewProject(this.state.projectName);
  }
  handleChange(e)
  {
      this.setState({
        ...this.state,
        [e.target.name] : e.target.value
      })
  }
  render() {
      const showHideclassname = this.props.addProjectSeen ? 'divModalOn' : 'divModalOff';
    return (
      <div class={showHideclassname}>
          <div class="modalContents">
              <header class="formHeader">Add New Bug <button class="xButton" onClick={() => this.props.addProjectButton()}>X</button></header>
              <form onSubmit={this.handleSubmit}>
                  <label class = "formName" for="projectName">Project Name: <input class="formInput" style={{/*width:"47%"*/}} type="text" id="projectName" name="projectName" onChange={this.handleChange} /></label>
                  <input class = "formButton" type="submit" value="Submit"/>
              </form>
          </div>
      </div>
    )
  }
}