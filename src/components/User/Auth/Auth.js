import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import SignUpForm from '../Signup'
import SignInForm from '../SignIn'
import { connect } from 'react-redux'
import {signIn, signUp} from '../../../ducks/auth'

class Auth extends Component {
  render() {
    return (
      <div>
        <h1>Auth page</h1>

        <Route path="/auth/sign-in"  render={this.signInForm}/>
        <Route path="/auth/sign-up"  render={this.signUnForm}/>

      </div>
    )
  }
 
  signUnForm = () => <SignUpForm onSubmit={this.handleSignUp}/>
  signInForm = () => <SignInForm onSubmit={this.handleSignIn}/>

  handleSignUp = ({ email, password }) => this.props.signUp(email, password)
  handleSignIn = ({ email, password }) => this.props.signIn(email, password)
}


export default connect(
  null,
  { signIn, signUp }
)(Auth)