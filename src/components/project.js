import React, { Component } from 'react';
import axios from 'axios';
import './style.css'
import Bugs from "./bugs"
import AddBugModal from './addbug';
import AddProjectModal from './addproject';


export default class Project extends Component {
  constructor(props) {
    super(props);

    this.onChangeProject = this.onChangeProject.bind(this);
    this.showBugs = this.showBugs.bind(this);
    this.changeStatusBug = this.changeStatusBug.bind(this);
    this.deleteBug = this.deleteBug.bind(this);
    this.addBugButton = this.addBugButton.bind(this);
    this.addNewBug = this.addNewBug.bind(this);
    this.addProjectButton = this.addProjectButton.bind(this);
    this.addNewProject = this.addNewProject.bind(this);
    this.isUnique = this.isUnique.bind(this);

    this.state = {
        addBugSeen : false,
        addProjectSeen: false,
        projects : [],
        projectsTitle: [],
        selectedProject: {title: "",
          bug1: [],
          bug2: [],
          bug3: []
        }
    };
  }

  changeStatusBug(e, bugSend)
  {
    if(e.target.id === "left")
    {
      bugSend.status = bugSend.status-1
      if(bugSend.status == 1)
      {
        this.state.selectedProject.bug1.push(bugSend)
        this.state.selectedProject.bug2.splice(this.state.selectedProject.bug2.indexOf(bugSend),1)
        this.setState({
          selectedProject: {"title" : this.state.selectedProject.title,
            "bug1" : this.state.selectedProject.bug1,
            "bug2" : this.state.selectedProject.bug2,
            "bug3" : this.state.selectedProject.bug3
          }
        })
      }
      if(bugSend.status == 2)
      {
        this.state.selectedProject.bug2.push(bugSend)
        this.state.selectedProject.bug3.splice(this.state.selectedProject.bug3.indexOf(bugSend),1)
        this.setState({
          selectedProject: {"title" : this.state.selectedProject.title,
            "bug1" : this.state.selectedProject.bug1,
            "bug2" : this.state.selectedProject.bug2,
            "bug3" : this.state.selectedProject.bug3
          }
        })
      }
      console.log("do i see you")
    }
    if(e.target.id === "right")
    {
      bugSend.status = bugSend.status+1
      if(bugSend.status == 2)
      {
        console.log("here")
        this.state.selectedProject.bug1.splice(this.state.selectedProject.bug1.indexOf(bugSend),1)
        this.state.selectedProject.bug2.push(bugSend)
        var tempSelectedProject =
          {"title" : this.state.selectedProject.title,
          "bug1" : this.state.selectedProject.bug1,
          "bug2" : this.state.selectedProject.bug2,
          "bug3" : this.state.selectedProject.bug3
      }
        this.setState({
          selectedProject: tempSelectedProject
          }
        )
        return
      }
      if(bugSend.status == 3)
      {
        this.state.selectedProject.bug2.splice(this.state.selectedProject.bug2.indexOf(bugSend),1)
        this.state.selectedProject.bug3.push(bugSend)
        this.setState({
          selectedProject: {"title" : this.state.selectedProject.title,
            "bug1" : this.state.selectedProject.bug1,
            "bug2" : this.state.selectedProject.bug2,
            "bug3" : this.state.selectedProject.bug3
          }
        })
        return
      }
    }
  }

  deleteBug(bugSend)
  {
    if(bugSend.status == 1)
    {
      this.state.selectedProject.bug1.splice(this.state.selectedProject.bug1.indexOf(bugSend),1)
      this.setState({
        selectedProject: {"title" : this.state.selectedProject.title,
          "bug1" : this.state.selectedProject.bug1,
          "bug2" : this.state.selectedProject.bug2,
          "bug3" : this.state.selectedProject.bug3
        }
      })
      return
    }
    if(bugSend.status == 2)
    {
      this.state.selectedProject.bug2.splice(this.state.selectedProject.bug2.indexOf(bugSend),1)
      this.setState({
        selectedProject: {"title" : this.state.selectedProject.title,
          "bug1" : this.state.selectedProject.bug1,
          "bug2" : this.state.selectedProject.bug2,
          "bug3" : this.state.selectedProject.bug3
        }
      })
      return
    }
    else
    {
      this.state.selectedProject.bug3.splice(this.state.selectedProject.bug3.indexOf(bugSend),1)
      this.setState({
        selectedProject: {"title" : this.state.selectedProject.title,
          "bug1" : this.state.selectedProject.bug1,
          "bug2" : this.state.selectedProject.bug2,
          "bug3" : this.state.selectedProject.bug3
        }
      })
      return
    }
  }

  componentWillMount() {
    axios.get('http://localhost:5000/projects/')
    .then(response => {
        this.setState({
          projects: response.data,
          projectsTitle : response.data.map(project => project.title),
          selectedProject : response.data[0]
        })
    })
    .catch((error) => {
      console.log(error);
    })
}

onChangeProject(e)
{
  this.state.projects.filter(project =>
    {
      if(project.title = e.target.value)
      {
        this.setState({
          selectedProject: project
        })
      }
    })
}

addNewProject(newProjectName)
{
  const newProject ={
    title : newProjectName,
    bug1:[],
    bug2:[],
    bug3:[]
  }
  this.setState({
    projects: [...this.state.projects, newProject], 
  });
}

showBugs()
{
  return( <div>
          <div class="column">ON HOLD{this.state.selectedProject.bug1.map(currentBug =>
          {
            return (<Bugs deleteBug={this.deleteBug} changeStatusBug={this.changeStatusBug} bugSend={currentBug}/>)
          })}
          </div>
          <div class="column"> CURRENT{this.state.selectedProject.bug2.map(currentBug =>
            {
              return (<Bugs deleteBug={this.deleteBug} changeStatusBug={this.changeStatusBug} bugSend={currentBug}/>)
            })}
            </div>
            <div class="column"> FINISHED{this.state.selectedProject.bug3.map(currentBug =>
            {
              return (<Bugs deleteBug={this.deleteBug} changeStatusBug={this.changeStatusBug} bugSend={currentBug}/>)
            })}
            </div>
        </div>
      )
}

isUnique(bugTitle)
{
  var returnVar = true;
  this.state.selectedProject.bug1.filter(currentBug =>
    {
      console.log(currentBug.title + " " + bugTitle)
      if(bugTitle == currentBug.title)
      {
        console.log("in if statement 1")
        returnVar = false
      }
      return false
    }
    )
  this.state.selectedProject.bug2.filter(currentBug =>
      {if(currentBug.title == bugTitle)
      {returnVar = false}})

  this.state.selectedProject.bug3.filter(currentBug =>
      {if(currentBug.title == bugTitle)
      {returnVar = false}})
    return returnVar
}

isUniqueProject(projectTitle)
{
  console.log(this.state.projects)
  var returnVar = true;
  this.state.projects.filter(currentProject =>
    {
      console.log(currentProject.title + " " + projectTitle)
      if(currentProject.title == projectTitle)
      {
        returnVar = false
      }
    }
    )
    return returnVar
}

addBugButton()
{ 
  this.setState({
    addBugSeen : !this.state.addBugSeen
  })
}
addProjectButton()
{ 
  this.setState({
    addProjectSeen : !this.state.addProjectSeen
  })
}
addNewBug(newBugName, newBugDescription)
{
  const newBug= {
    title: newBugName,
    description: newBugDescription,
    status: 1
  }
  this.state.selectedProject.bug1.push(newBug);
  this.setState({
    selectedProject: {"title" : this.state.selectedProject.title,
    "bug1" : this.state.selectedProject.bug1,
    "bug2" : this.state.selectedProject.bug2,
    "bug3" : this.state.selectedProject.bug3
  }
  })
}

  render() {
    console.log(this.state.projects)
    return (
      <div className="appStyle">
          <header className="headerBit">BugTracker</header>
          <div className="currentProjectDiv">
          <form>
              <label>
                  Current Project:
              </label>
              <select ref="currentProject"
              required
              className="form-control"
              value={"fucl"}
              onChange={this.onChangeProject}>
                                {
                this.state.projects.map(project => {
                  return <option 
                    key={project.title}
                    value={project.title}>{project.title}
                    </option>;
                })
              }
              </select>
          </form>
          <button class = "addBugButton" onClick={()=> this.addProjectButton()}>Add Project</button>
          </div>
          <div class="row"> {this.showBugs()}
          <button class="addBugButton" onClick={() => this.addBugButton()}>Add Bug</button>
          <AddBugModal isUnique={this.isUnique} addNewBug={this.addNewBug} addBugButton={this.addBugButton} addBugSeen={this.state.addBugSeen}></AddBugModal>
          <AddProjectModal isUniqueProject={this.isUniqueProject} addNewProject={this.addNewProject} addProjectButton={this.addProjectButton} addProjectSeen={this.state.addProjectSeen}></AddProjectModal>
          </div>
      </div>
    )
  }
}