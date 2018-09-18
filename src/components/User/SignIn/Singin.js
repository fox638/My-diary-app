import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import ErrorField from '../../common/ErrorField'
import emailValidator from 'email-validator'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'

import LockIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'


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
       },
   },
   paper:{
       marginTop: theme.spacing.unit * 8,
       display: 'flex',
       flexDirection: 'column',
       alignItems:'center',
       padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px` 
   },
   avatar:{
       margin: theme.spacing.unit,
       backgroundColor: theme.palette.secondary.main
   },
   form:{
       width: '100%',
       marginTop: theme.spacing.unit
   },
   submit: {
    marginTop: theme.spacing.unit * 3,
  },
})

const validate = ({email, password}) => {
    const errors = {}

    if(!email) errors.email = 'email is required'
    else if(!emailValidator.validate(email)) errors.email = 'invalid email'

    if(!password) errors.password = 'password is required'
    else if(password.length < 6) errors.password = 'to short'

    return errors
}

class SignInFrom extends Component {
    
    render() {

        const { classes, handleSubmit } = this.props

        return (
            <React.Fragment>
                <div className={classes.layout}>
                   <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockIcon/>
                    </Avatar>
                    <Typography variant="headline">Sign In</Typography>
                    <form onSubmit={handleSubmit} className={classes.from}>
                        <Field name="email" component={ErrorField}/>
                        <Field name="password" component={ErrorField} type="password"/>
                        <Button
                            type="submit"
                            fullWidth
                            variant="raised"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign in
                        </Button>
                    </form>
                   </Paper>
                </div>
            </React.Fragment>
        )
    }
}

// class SignInFrom extends Component {
   
//     render() {
//         const {classes} = this.props
//         return (
//             <div>
//                 <h3 >SignIn Form</h3>

//                 <form onSubmit={this.props.handleSubmit}>
//                     <div>
//                         email: <Field name='email' component='input'/>
//                     </div>
//                     <div>
//                         password: <Field name='password' component='input' type="password" />

//                     </div>
//                     <button type="submit">Sign In</button>
//                 </form>
//             </div>
//         )
//     }
// }

export default withStyles(styles)(reduxForm({
    form:'signin',
    validate
})(SignInFrom))