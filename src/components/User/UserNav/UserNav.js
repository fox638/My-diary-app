import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {moduleName, signOut} from '../../../ducks/auth'


const UserNavNonAuth = () => 
  <div className="header__user_menu user_menu">
    <div className="user_menu__item">
        <NavLink to='/auth/sign-in' className="user_menu__link">Sign in</NavLink>
    </div>
    <div className="user_menu__item">
        <NavLink to='/auth/sign-up' className="user_menu__link">Sign up</NavLink>
    </div>
  </div>

const UserNavAuth = (props) => 
  <div>
    <a onClick={props.signOut}>signOut</a>
  </div>
  

class UserNav extends Component {
  render() {
    return (
      <div>
        {this.navigationItems()}
      </div>
    )
  }
  componentWillReceiveProps(){
    console.log('-----------', 'Component will recive props')
  }

  navigationItems() {
      const {authUser, signOut} = this.props
      return (
        <React.Fragment>
            {
              authUser 
              ? <UserNavAuth signOut={signOut} user={authUser}/>
              : <UserNavNonAuth/>
            }
          </React.Fragment>
      )
  }
}

export default connect((state)=>({
  authUser: state[moduleName].user
}), {signOut}, null, {pure: false})(UserNav) 
