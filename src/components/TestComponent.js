import React, { Component } from 'react'

export default class TestComponent extends Component {

  state = {
    titleChange: false,
  }

  handleClick = () => {
    this.setState({
      titleChange: !this.state.titleChange,
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Hola</button>
        {
          this.state.titleChange ? <h1>wooooohooooo</h1> : <h1>Waaaaaaaaaaa</h1>
        }
      </div>
    )
  }
}
