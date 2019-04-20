import React from 'react'
import { SummaryCard } from './index'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(
    <SummaryCard
      installmentAmount="465,00"
      amount={123456}
      feeRate="111,12%"
    />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
