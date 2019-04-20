import React from 'react'
import PropTypes from 'prop-types'
import { InputWrapper } from '../InputWrapper'
import { formatter } from '../../utils/lib'
import './styles.css'

export class Input extends React.Component {
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

  render () {
    const { inputId, label, min, max, onChange } = this.props
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
            onChange={(e) => onChange(e.target.id, e.target.value)}
            name={inputId}
            id={inputId}
            value={this.state.value}
          />
        </InputWrapper>
        <div className="field">
          <div className="range">
            <input
              type="range"
              name={inputId}
              id={inputId}
              onChange={(e) => onChange(e.target.id, e.target.value)}
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

Input.propTypes = {
  inputId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func.isRequired,
}
