import React from 'react';
import App from './App'
import AccountBalance from './components/AccountBalance'
import Notification from './components/Notification'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json';

const userBalance = {
  balance: 1100,
  savingBalance: 103,
}
describe('rendering components', ()=>{
  it('Renders component correctly', ()=>{
    shallow(<App />)
  })
  it('renders app component Header correctly', ()=>{
    const wraper = shallow(<App />)
    const header = (<h1 className="has-text-centered title is-1">Welcome in the personal finance app!</h1>)
    expect(wraper.contains(header)).toEqual(true)
  })
  it('renders notifications component correctly', ()=>{
    shallow(<Notification />)
  })
  it('renders button', ()=>{
    const wrapper = mount(<AccountBalance account={userBalance} />)
    const label = wrapper.find('#balance-button').text()
    expect(label).toEqual('Send 100$')
  })
})

describe('passing props', ()=>{
  const accounWrapper= mount(<AccountBalance accounts={userBalance} />)
  const notificationWrapper = mount(<Notification balance={userBalance.balance} />)
  it('accepts user account props', ()=>{
    expect(accounWrapper.props().accounts).toEqual(userBalance)
  })
  it('contains savingBalance value', ()=>{
    const value = accounWrapper.find('.savings').text()
    const expetedValue = userBalance.savingBalance +'$'
    expect(value).toEqual(expetedValue)
  })
  it('notification accept props', ()=>{
    expect(notificationWrapper.props().balance).toEqual(userBalance.balance)
  })
})

describe('logic', ()=>{
  const wrapper = mount(<AccountBalance accounts={userBalance} />)
  const notificationWrapper= mount(<Notification balance={userBalance.balance} />)
  wrapper.find('#balance-button').simulate('click')
  it('button click - update savings', ()=>{
    const savingsValue= wrapper.find('.savings').text()
    const expectedValue= userBalance.savingBalance + 100 + '$'
    expect(savingsValue).toEqual(expectedValue)
  })
  it('button click - update balance', ()=>{
    const balanceValue = wrapper.find('.balance').text()
    const expectedBalance = userBalance.balance - 100 + '$'
    expect(balanceValue).toEqual(expectedBalance)
  })
})

describe('snapshots', ()=>{
  it('app snapshots', ()=>{
    const tree = shallow(<App />)
    expect(toJson(tree)).toMatchSnapShot()
  })
  it('accounts snapshot', ()=>{
    const accountBalanceTree = shallow(<AccountBalance accounts={userBalance} />)
    expect(toJson(accountBalanceTree)).toMatchSnapShot()
  })
  it('Notification snapshot', ()=>{
    const notificationTree = shallow(<Notification balance={userBalance.balance} />)
    expect(toJson(notificationTree)).toMatchSnapShot()
  })
})