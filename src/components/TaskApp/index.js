import {Component} from 'react'
import {v4 as uudiv4} from 'uuid'

import Tags from '../Tags'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class TaskApp extends Component {
  state = {
    userInput: '',
    category: tagsList[0].displayText,
    taskList: [],
    activeId: null,
  }

  handleUserInput = event => {
    this.setState({userInput: event.target.value})
  }

  handleSelectOption = event => {
    this.setState({category: event.target.value})
  }

  activeTabId = optionId => {
    this.setState({activeId: optionId})
  }

  submitMyTask = event => {
    event.preventDefault()
    const {userInput, category} = this.state
    const newTask = {
      id: uudiv4(),
      taskName: userInput,
      category: category,
    }
    this.setState(prevState => ({
      taskList: [...prevState.taskList, newTask],
      userInput: '',
      category: tagsList[0].displayText,
    }))
  }

  renderTaskInput = () => {
    const {userInput} = this.state
    return (
      <>
        <label htmlFor="task">Task</label>
        <input
          value={userInput}
          type="text"
          placeholder="Enter the task here"
          id="task"
          onChange={this.handleUserInput}
        />
      </>
    )
  }

  renderSelectOption = () => {
    const {category} = this.state
    return (
      <>
        <label htmlFor="tags">Tags</label>
        <select id="tags" onChange={this.handleSelectOption}>
          {tagsList.map(tags => (
            <option key={tags.optionId} value={tags.displayText}>
              {tags.displayText}
            </option>
          ))}
        </select>
      </>
    )
  }

  render() {
    const {taskList, activeId} = this.state
    console.log(activeId)
    let filteredTasklist = taskList

    if (activeId !== null) {
      filteredTasklist = taskList.filter(
        task => task.category.toLowerCase() === activeId.toLowerCase(),
      )
    }

    return (
      <div className="main-container">
        <div className="card-container">
          <div className="create-task-container">
            <h1 className="create-main-heading">Create a task</h1>
            <form className="form-container" onSubmit={this.submitMyTask}>
              <div className="input-container">{this.renderTaskInput()}</div>
              <div className="input-container">{this.renderSelectOption()}</div>
              <button type="submit" className="add-btn">
                Add Task
              </button>
            </form>
          </div>
          <div className="tags-container">
            <h1 className="tag-heading">Tags</h1>
            <ul className="tags-list">
              {tagsList.map(tags => (
                <Tags
                  tagsList={tags}
                  key={tags.optionId}
                  isActive={tags.optionId === activeId}
                  activeTabId={this.activeTabId}
                />
              ))}
            </ul>
            <div>
              <h1 className="tag-heading">Tasks</h1>
              {filteredTasklist.length === 0 ? (
                <div>
                  <p className="tag-heading">No Tasks Added Yet</p>
                </div>
              ) : (
                <ul className="taks-unorder-list">
                  {filteredTasklist.map(task => (
                    <li key={task.id} className="tasks-list-item-container">
                      <p className="taks-values">{task.taskName}</p>
                      <p className="task-list-btn">{task.category}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default TaskApp
