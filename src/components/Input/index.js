import React from 'react'
import PropTypes from 'prop-types'
import { InputWrapper } from '../InputWrapper'
import './styles.css'

export class Input extends React.Component {
  onChange = (e) => {
    this.props.onChange(e.target.id, e.target.value)
  }

  render () {
    const { inputId, label, value, min, max } = this.props

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
            value={value}
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
              value={value}
              step="1"
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
