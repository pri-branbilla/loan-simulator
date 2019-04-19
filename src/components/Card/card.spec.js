import React from 'react'
import { Card } from './index'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(
    <Card
      installmentAmount="465,00"
      totalAmount="11.112,00"
      interestRate="111,12%"
    />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
