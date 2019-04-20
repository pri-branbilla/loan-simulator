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
      onChange={() => {}}
    />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

it('test input text value change', () => {
  let inputValue = 'test'
  const changeValue = (name, value) => inputValue = value
  const tree = mount(
    <SelectorInput
      inputId="inputId"
      label="Test"
      onChange={changeValue}
    />
  )
  tree.find('input').at(0).simulate('change', { target: { value: 'test 234234' } })
  expect(inputValue).toBe('test 234234')

  tree.find('input').at(1).simulate('change', { target: { value: 'test 1111' } })
  expect(inputValue).toBe('test 1111')
})
