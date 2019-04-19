import React from 'react'
import PropTypes from 'prop-types'
import { InputWrapper } from '../InputWrapper'
import './styles.css'

export class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value
    }
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value
    })
    this.props.onChange(e.target.id, e.target.value)
  }

  render () {
    const { inputId, label, min, max } = this.props
    return (
      <div className="field-group">
        <InputWrapper
          inputId={inputId}
          label={label}
        >
          <input
            type="text"
            required
            min={min}
            max={max}
            onChange={this.onChange}
            name={inputId}
            id={inputId}
            value={this.state.value}
          />
        </InputWrapper>
        <div className="field">
          <div className="range">
            <input
              type="range"
              name={inputId + "-range"}
              id={inputId + "-range"}
              onChange={this.onChange}
              min={min}
              max={max}
              value={this.state.value}
              step="10"
            />
            <div className="range__values">
              <span>{min}</span>
              <span>{max}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Input.propTypes = {
  inputId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func.isRequired,
}
