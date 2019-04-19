import React from 'react'
import { InputWrapper } from '.'
import renderer from 'react-test-renderer'

it('renders correctly with input', () => {
  const tree = renderer.create(
    <InputWrapper
      inputId="inputId"
      label="Test"
    >
      <input type="text" required name="inputId" id="inputId" value="14400" />
    </InputWrapper>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly with select', () => {
  const tree = renderer.create(
    <InputWrapper
      inputId="inputId"
      label="Test"
    >
      <select name="inputId" id="inputId" required>
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
    </InputWrapper>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
