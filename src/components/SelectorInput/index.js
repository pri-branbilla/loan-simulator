import React from 'react'
import PropTypes from 'prop-types'
import { InputWrapper } from '../InputWrapper'
import { formatter } from '../../lib/utils'
import './styles.css'

export class SelectorInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value
    }
  }

  componentWillReceiveProps = (props) => {
    const { value } = this.props
    if (props.value !== value) {
      this.setState({
        value: props.value
      })
    }
  }

  actualValue = (max, min, name, value) => {
    let actualValue = value
    if (value > min) {
      if (value > max) {
        actualValue = max
      }
      if (value < 0) {
        actualValue = value * (-1)
      }
      return this.props.onChange(name, actualValue)
    }
    return this.props.onChange(name, min)
  }

  minValue = (name, value) => {
    if (value < this.props.min) {
      return this.props.onChange(name, this.props.min)
    }
    return this.props.onChange(name, value)
  }

  render () {
    const { inputId, label, min, max } = this.props
    return (
      <div className="field-group">
        <p className="inline-label">R$</p>
        <InputWrapper
          inputId={inputId}
          label={label}
        >
          <input
            type="number"
            required
            min={min}
            max={max}
            onBlur={(e) => this.minValue(e.target.id, e.target.value)}
            onChange={(e) => this.actualValue(max, min, e.target.id, e.target.value)}
            name={inputId}
            id={inputId}
            value={this.state.value}
            step="0.01"
          />
        </InputWrapper>
        <div className="field">
          <div className="range">
            <input
              type="range"
              name={inputId}
              id={inputId}
              onInput={(e) => this.actualValue(max, min, e.target.id, e.target.value)}
              onChange={(e) => this.actualValue(max, min, e.target.id, e.target.value)}
              min={min}
              max={max}
              value={this.state.value}
              step="10"
            />
            <div className="range__values">
              <span>{formatter(min)}</span>
              <span>{formatter(max)}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SelectorInput.defaultProps = {
  value: 0
}

SelectorInput.propTypes = {
  inputId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}
