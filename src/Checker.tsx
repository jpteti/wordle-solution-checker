import React from 'react';
import { Form } from 'react-bulma-components'
const { Field, Label, Control, Input } = Form

export default class Checker extends React.Component {
  state = this.getInitialState()

  getInitialState() {
    const solutions: string[] = []

    return {
      solutions,
      inputLength: 0,
      isLoading: true,
      proposedSolutionPresent: false
    }
  }

  componentDidMount() {
    this.getSolutions()
  }

  getSolutions() {
    fetch('/solutions.json')
      .then(res => res.json())
      .then(res => {
        const { solutions } = res
        this.setState({
          solutions,
          isLoading: false
        })
      })
  }

  handleChange(e: { target: { value: string } }) {
    const { value } = e.target
    const { solutions } = this.state

    const proposedSolutionPresent = solutions.includes(value.toLowerCase())
    const inputLength = value.length

    this.setState({
      proposedSolutionPresent,
      inputLength
    })
  }

  getLabelText() {
    const { proposedSolutionPresent } = this.state

    if (proposedSolutionPresent) {
      return "Proposed solution IS present in the list of possible solutions."
    } else {
      return "Proposed solution IS NOT in the list of possible solutions."
    }
  }

  getInputColor() {
    const { proposedSolutionPresent, inputLength } = this.state

    if (inputLength < 5) {
      return "default"
    }

    if (proposedSolutionPresent) {
      return "success"
    } else {
      return "danger"
    }
  }

  render() {
    const { isLoading } = this.state
    const labelText = this.getLabelText()

    if (isLoading) {
      return (
        <div>Loading...</div>
      )
    }

    const inputColor = this.getInputColor()

    return (
      <div>
        <Field>
          <Label>Proposed solution</Label>
          <Control>
            <Input
              type="text"
              placeholder="Enter your solution here"
              maxLength={5}
              onChange={this.handleChange.bind(this)}
              color={inputColor}
            />
          </Control>
        </Field>
        <p>{labelText}</p>
      </div>
    )
  }
}