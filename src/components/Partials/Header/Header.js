import React, { Component } from 'react'

import Nav from '../Nav'
import Logo from '../Logo'
import UserNav from '../../User/UserNav'

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <Logo/>
        <Nav/>
        <UserNav/>
      </div>
    )
  }
}
