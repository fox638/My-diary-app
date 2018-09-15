import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import { withStyles } from '@material-ui/core/styles'

import Nav from '../Nav'
import Logo from '../Logo'
import UserNav from '../../User/UserNav'
import { Toolbar } from '@material-ui/core';


const styles = theme => ({
  appBar: {
    position:'relative'
  }
})


class Header extends Component {
  render() {
    const {classes} = this.props 
    return (
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar>
          <Logo/>
          <Nav/>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(Header)