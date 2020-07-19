import React, { Component } from 'react';
import './style.css'

export default class AddBugModal extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
        bugName: '',
        bugDescription: ''
    };
  }
  handleSubmit(e)
  {
    e.preventDefault();
    console.log(this.state.bugName)
    const wot = this.props.isUnique(this.state.bugName);
    if(wot === false)
    {
      alert("Title must be Unique")
      return
    }
    if(this.state.bugName === "" || this.state.bugDescription === "")
    {
      alert("Please fill in the fields")
      return
    }
    this.props.addBugButton();
    this.props.addNewBug(this.state.bugName, this.state.bugDescription);
  }
  handleChange(e)
  {
      this.setState({
        ...this.state,
        [e.target.name] : e.target.value
      })
  }
  render() {
      const showHideclassname = this.props.addBugSeen ? 'divModalOn' : 'divModalOff';
    return (
      <div class={showHideclassname}>
          <div class="modalContents">
              <header class="formHeader">Add New Bug <button class="xButton" onClick={() => this.props.addBugButton()}>X</button></header>
              <form onSubmit={this.handleSubmit}>
                  <label class = "formName" for="bugName">Bug Name: <input class="formInput" style={{width:"47%"}} type="text" id="bugName" name="bugName" onChange={this.handleChange} /></label>
                  <label class = "formDescription" for="bugDescription">Bug Description: <input class="formInput" type="text" id="bugDescription" name="bugDescription" onChange={this.handleChange}></input></label>
                  <label class = "formStatus" for="bugDescription">Bug Status: On Hold</label>
                  <input class = "formButton" type="submit" value="Submit"/>
              </form>
          </div>
      </div>
    )
  }
}