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

  maxLength = (max, min, name, value) => {
    let actualValue = value
    if (String(value).length > String(max).length) {
      actualValue = Number(String(value).slice(0, String(max).length))
    }
    if (value > max) {
      actualValue = max
    }
    if (value < 0) {
      actualValue = value * (-1)
    }
    this.props.onChange(name, actualValue)
  }

  render () {
    const { inputId, label, min, max, hideRange } = this.props
    const fieldGroupStyle = hideRange ? "field-group only-input" : "field-group"
    const inputWidth = hideRange ? { width: '100%' } : { width: 150 }
    return (
      <div className={fieldGroupStyle}>
        <InputWrapper
          hideRange={hideRange}
          inputId={inputId}
          label={label}
        >
          <input
            style={inputWidth}
            type="number"
            required
            min={min}
            max={max}
            onChange={(e) => this.maxLength(max, min, e.target.id, e.target.value)}
            name={inputId}
            id={inputId}
            value={this.state.value}
            step="0.01"
          />
        </InputWrapper>
        { !hideRange && (
          <div className="field">
            <div className="range">
              <input
                type="range"
                name={inputId}
                id={inputId}
                onInput={(e) => this.maxLength(max, min, e.target.id, e.target.value)}
                onChange={(e) => this.maxLength(max, min, e.target.id, e.target.value)}
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
        )}
      </div>
    )
  }
}

SelectorInput.defaultProps = {
  value: 0,
  hideRange: false,
}

SelectorInput.propTypes = {
  inputId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number,
  hideRange: PropTypes.bool,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}
