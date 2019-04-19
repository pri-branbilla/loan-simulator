import React from 'react'
import { Select } from '.'
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16'
import { mount, configure } from 'enzyme'

configure({adapter: new Adapter()})

const options = [
  {
    value: 1,
    label: "test 1"
  },
  {
    value: 2,
    label: "test 2"
  }
]

it('renders correctly', () => {
  const tree = renderer.create(
    <Select
      inputId="inputId"
      label="Test"
      options={options}
      onChange={() => {}}
    />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

it('test selector', () => {
  let selectValue = 1
  const changeValue = (name, value) => selectValue = value
  const tree = mount(
    <Select
      inputId="inputId"
      label="Test"
      options={options}
      onChange={changeValue}
    />
  )
  tree.find('select').simulate('change', { target: { value: 2 } })
  expect(selectValue).toBe(2)
})
