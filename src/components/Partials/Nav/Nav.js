import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline' 
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import {connect} from 'react-redux'
import {moduleName, signOut} from '../../../ducks/auth'

const styles = theme => ({
   navLink:{
     textDecoration:'none'
   },
   button:{
    margin: theme.spacing.unit,
   },
})

class Nav extends Component {
  render() {
    const {classes, auth, signOut} = this.props
    const userAuthTrue = () => (<React.Fragment>
                                <Button 
                                  color="primary" 
                                  variant="outlined" 
                                  className={classes.button}
                                  onClick={this.handleLogout}
                                > 
                                  Logout 
                                </Button>
                                </React.Fragment>)
  const userAuthFalse = () => (<React.Fragment>
                                <Button color="primary" variant="outlined" className={classes.button}>
                                  <NavLink to="/auth/sign-in" className={classes.navLink}>Login</NavLink>
                                </Button>
                                <Button color="primary" variant="outlined" className={classes.button}>
                                  <NavLink to="/auth/sign-up" className={classes.navLink}>Sign Up</NavLink>
                                </Button></React.Fragment>)
                                
   const UserMenu = auth ? userAuthTrue : userAuthFalse

    return (
      <React.Fragment>
          <Button className={classes.button}>
            <NavLink to="/" className={classes.navLink}>Главная</NavLink>
          </Button>
          <Button className={classes.button}>
            <NavLink to="/diary" className={classes.navLink}>Дневник</NavLink>
          </Button>
          <Button className={classes.button}>
            <NavLink to="/about" className={classes.navLink}>О сайте</NavLink>
          </Button>
          <UserMenu/>
          

      </React.Fragment>
    )
  }

  handleLogout = () => this.props.signOut()
}


export default withStyles(styles)(
  connect(state=>({
    auth: !!state[moduleName].user
  }), {signOut})(Nav)) 