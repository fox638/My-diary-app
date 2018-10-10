import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {signIn, signUp, resetPassword} from '../../../ducks/auth'

import SignUpForm from '../Signup'
import SignInForm from '../SignIn'
import PasswordRecovery from '../PasswordRecovery'

class Auth extends Component {
  render() {
    
    return (
      <React.Fragment>
        <Route path="/auth/sign-in"  render={this.signInForm}/>
        <Route path="/auth/sign-up"  render={this.signUnForm}/>
        <Route path="/auth/pass-reset" render={this.passwordRecoveryFrom}/>

      </React.Fragment>
    )
  }
 
  signUnForm = () => <SignUpForm onSubmit={this.handleSignUp} />
  signInForm = () => <SignInForm onSubmit={this.handleSignIn} />
  passwordRecoveryFrom = () => <PasswordRecovery onSubmit={this.handlePasswordRecovery} />

  handleSignUp = ({ email, password }) => this.props.signUp(email, password)
  handleSignIn = ({ email, password }) => this.props.signIn(email, password)
  handlePasswordRecovery = ({email}) => this.props.resetPassword(email)
}


export default connect(
  null,
  { 
    signIn, 
    signUp,
    resetPassword 
  }
)(Auth)