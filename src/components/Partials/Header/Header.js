import React, { Component } from 'react'

import Nav from '../Nav'
import Logo from '../Logo'

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <Logo/>
        <Nav/>
      </div>
    )
  }
}
