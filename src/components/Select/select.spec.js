import React from 'react'
import { Select } from '.'
import renderer from 'react-test-renderer'

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
    />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
