import React from 'react'
import PropTypes from 'prop-types'
import { InputWrapper } from '../InputWrapper'
import './styles.css'

export class Select extends React.Component {
  onChange = (e) => {
    this.props.onChange(e.target.id, e.target.value)
  }

  render () {
    const { inputId, label, options } = this.props

    return (
      <InputWrapper
        inputId={inputId}
        label={label}
      >
        <select name={inputId} id={inputId} onChange={this.onChange} required>
          {options.map(
            (option, i) => (
              <option key={i + option.value} value={option.value}>
                {option.label}
              </option>
            )
          )}
        </select>
      </InputWrapper>
    )
  }
}

Select.propTypes = {
  inputId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.node,
    label: PropTypes.string,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
}
