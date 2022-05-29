import React from 'react';
import { Form } from 'react-bulma-components'
const { Field, Label, Control, Input } = Form

export default class Checker extends React.Component {
  state = this.getInitialState()

  getInitialState() {
    const solutions: string[] = []

    return {
      solutions,
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

    const proposedSolutionPresent = solutions.includes(value)

    this.setState({
      proposedSolutionPresent
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

  render() {
    const { isLoading } = this.state
    const labelText = this.getLabelText()

    if (isLoading) {
      return (
        <div>Loading...</div>
      )
    }

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
            />
          </Control>
        </Field>
        <p>{labelText}</p>
      </div>
    )
  }
}