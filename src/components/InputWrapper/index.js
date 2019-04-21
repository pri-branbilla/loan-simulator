import React from 'react'
import PropTypes from 'prop-types'
import './styles.css'

export class InputWrapper extends React.PureComponent {
  render () {
    const { label, children, inputId } = this.props
    return (
      <div className="field">
        <label htmlFor={inputId}>{label}</label>
        {children}
      </div>
    )
  }
}

InputWrapper.propTypes = {
  inputId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.oneOfType(
    [
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ],
  ).isRequired,
}
