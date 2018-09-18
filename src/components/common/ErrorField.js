import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import FormHelperText from '@material-ui/core/FormHelperText'

import withStyles from '@material-ui/core/styles/withStyles'


const styles = theme => ({

})

const ErrorField = (props) => {
    const {input, type, label, meta: {error, touched}} = props
    const errorText = touched && error && <FormHelperText>{error}</FormHelperText>
    const inputLabeText = label ? label : input.name
    return (
        <FormControl margin="normal" required fullWidth error={!!touched && !!error}>
            
            <InputLabel htmlFor="email">{ inputLabeText }</InputLabel>
            <Input {...input} type={type}></Input>
            {errorText}
        </FormControl>
    )
} 

export default withStyles(styles)(ErrorField)