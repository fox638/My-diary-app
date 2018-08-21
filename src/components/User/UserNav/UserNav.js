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
          <div className="header__user_menu user_menu">
            <div className="user_menu__item">
                <NavLink to='/auth/sign-in' className="user_menu__link">Sign in</NavLink>
            </div>
            <div className="user_menu__item">
                <NavLink to='/auth/sign-up' className="user_menu__link">Sign up</NavLink>
            </div>
            
          </div>
      )
  }
}

export default UserNav
