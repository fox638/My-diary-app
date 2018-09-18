import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from '../../common/ErrorField'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'

import Pets from '@material-ui/icons/Pets'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  layout:{
    width:"auto",
    display:"block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]:{
      width: 400,
      marginLeft:"auto",
      marginRight:"auto"
    },  
  },
  paper:{
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems:"center",
    padding:`${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`,
  },
  avatar:{
    margin:theme.spacing.unit,
    backgroundColor:theme.palette.secondary.main
  },
  submit:{
    marginTop:theme.spacing.unit * 3,
  }
})

class SignUpForm extends Component {
  render() {
    const {handleSubmit, classes} = this.props
    return (
      <React.Fragment>
       <div className={classes.layout}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Pets/>
          </Avatar>
          <Typography variant="headline">Sign up</Typography>
          <form onSubmit = {handleSubmit}>
              <Field name="email" component={ErrorField}/>
              <Field name="password" component={ErrorField}/> 
              <Field label="Repeat password" name="repeatPassword" type="pasword" component={ErrorField}/> 
              <Button
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
                className={classes.submit}
              >
                Sign UP
              </Button>
          </form>
        </Paper>
        
       </div>
        
      </React.Fragment>
    )
  }
  
}
const validate = ({email, password, repeatPassword})=> {
  const errors = {}

  if(!email) errors.email = 'email is required'
  else if (!emailValidator.validate(email)) errors.email = 'invalid email'

  if(!password) errors.password = 'password is required'
  else if (password.length < 6 ) errors.password = 'to short'

  if(!repeatPassword) errors.repeatPassword = 'Repeat password is required'
  else if (repeatPassword !== password ) errors.repeatPassword = 'Repeat password !== password '
  
  return errors
}

export default withStyles(styles)(reduxForm({
  form:'signup',
  validate
})(SignUpForm))