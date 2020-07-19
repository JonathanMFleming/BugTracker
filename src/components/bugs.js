import React, { Component } from 'react';
//import axios from 'axios';
import './style.css'
import bugIcon from './bugIcon.png'

export default class Bugs extends Component {
  constructor(props) {
    super(props);

    this.checkStatus = this.checkStatus.bind(this)
    this.renderButtons = this.renderButtons.bind(this)
    this.changeStatus = this.changeStatus.bind(this)
    this.deleteBug = this.deleteBug.bind(this)

    this.state = {
    };
  }
  changeStatus(e)
  {
      this.props.changeStatusBug(e, this.props.bugSend)
  }
  deleteBug()
  {
      this.props.deleteBug(this.props.bugSend)
  }
  renderButtons()
  {
    if(this.props.bugSend.status === 1)
    {
        return(<div class="arrowButtonDiv"><button class="arrowButton" type="button" disabled>&larr;</button>|<button class="arrowButton" onClick={this.changeStatus} id="right">&rarr;</button></div>)
    }
    if(this.props.bugSend.status === 2)
    {
        return(<div style={{display:"inline"}}><button class="arrowButton" onClick={this.changeStatus} id="left">&larr;</button>|<button class="arrowButton" onClick={this.changeStatus} id="right">&rarr;</button></div>)
    }
    else
    {
        return(<div style={{display:"inline"}}><button class="arrowButton" onClick={this.changeStatus} id="left">&larr;</button>|<button class="arrowButton" type="button" disabled>&rarr;</button></div>)
    }
  }
  checkStatus()
  {
    if(this.props.bugSend.status === 1)
    {
        return "On Hold"
    }
    if(this.props.bugSend.status === 2)
    {
        return "Current"
    }
    else
    {
        return "Finished"
    }
  }
  render() {
    return (
      <div>
        <div class="bugDiv">
            <img src={bugIcon} alt="boohoo" className="iconBug"/>
            <div class="textDiv">
                <div>Title: {this.props.bugSend.title}</div>
                <button onClick={this.deleteBug} class="xButton">X</button>
                <div>Description: {this.props.bugSend.description}</div>
                <div>Status: {this.checkStatus()}{this.renderButtons()}</div>
                </div>
            </div>
      </div>
    )
  }
}