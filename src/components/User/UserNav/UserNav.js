import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class UserNav extends Component {
  render() {
    return (
      <div>
        {this.navigationItems()}
      </div>
    )
  }

  navigationItems() {
      return (
          <div>
            <div>
                <NavLink to='/auth/sign-in'>Sign in</NavLink>
            </div>
            <div>
                <NavLink to='/auth/sign-up'>Sign up</NavLink>
            </div>
            
          </div>
      )
  }
}

export default UserNav
