import React, { Component, Fragment } from 'react'
import {reduxForm, Field} from 'redux-form'
import ErrorField from '../../common/ErrorField'
import emailValidator from 'email-validator'

import withStyles from "@material-ui/core/styles/withStyles"
import { Paper, Typography, Button } from '@material-ui/core';

const styles = theme => ({
    layout:{
        width: "auto",
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]:{
            width: 400,
            marginLeft:'auto',
            marginRight: 'auto'
        }
    },
    paper:{
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px` 
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },

})

const validate = ({email, password}) => {
    const errors = {}

    if(!email) errors.email = 'email is required'
    else if(!emailValidator.validate(email)) errors.email = 'invalid email'

    return errors
}


class PasswordRecovery extends Component {

    
  render() {

    const {classes, handleSubmit} = this.props

    return (
      <div className={classes.layout}>
        <Paper className={classes.paper}>
            <Typography variant="headline">Password recovery</Typography>
            <form onSubmit={handleSubmit}>
                <Field name="email" component={ErrorField}/>
                <Button
                    type="submit"
                    fullWidth
                    variant="raised"
                    color="primary"
                    className={classes.submit}
                >
                    Recovery
                </Button>
            </form>
        </Paper>
          
      </div>
    )
  }
}


export default withStyles(styles)(reduxForm({
    form:'passwordRecovery',
    validate

})(PasswordRecovery))