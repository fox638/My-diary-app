import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'
import ErrorField from '../../common/ErrorField'
import emailValidator from 'email-validator'

import withStyles from "@material-ui/core/styles/withStyles"

const styles = {

}

class PasswordRecovery extends Component {
  render() {
    return (
      <div>
          
      </div>
    )
  }
}


export default withStyles(styles)(reduxForm({
    form:'passwordRecovery',
    

})(PasswordRecovery))