import React from 'react'
import { SelectorInput } from '.'
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16'
import { mount, configure } from 'enzyme'

configure({adapter: new Adapter()})

it('renders correctly', () => {
  const tree = renderer.create(
    <SelectorInput
      inputId="inputId"
      label="Test"
      min={100}
      max={900}
      onChange={() => {}}
    />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

it('test input text value change', () => {
  let inputValue = 123
  const changeValue = (name, value) => inputValue = value
  const tree = mount(
    <SelectorInput
      inputId="inputId"
      label="Test"
      min={100}
      max={900}
      onChange={changeValue}
    />
  )
  tree.find('input').at(0).simulate('change', { target: { value: 456 } })
  expect(inputValue).toBe(456)

  tree.find('input').at(1).simulate('change', { target: { value: 789 } })
  expect(inputValue).toBe(789)
})
