import React from 'react'
import PropTypes from 'prop-types'
import './styles.css'

export class InputWrapper extends React.PureComponent {
  render () {
    const { label, children, inputId, hideRange } = this.props
    const fieldClass = hideRange ? "field only-input" : "field"
    return (
      <div className={fieldClass}>
        <label htmlFor={inputId}>{label}</label>
        {children}
      </div>
    )
  }
}

InputWrapper.defaultProps = {
  hideRange: false,
}

InputWrapper.propTypes = {
  hideRange: PropTypes.bool,
  inputId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.oneOfType(
    [
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ],
  ).isRequired,
}
