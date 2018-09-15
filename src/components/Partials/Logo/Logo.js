import React from 'react'
import {Link} from 'react-router-dom'
import {withStyles} from "@material-ui/core/styles"
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
    toolbarTitle:{
        flex:1
    },
    toolbarLink:{
        textDecoration:"none",
        color:"black"
    }

})

const Logo = (props) => 
    <React.Fragment>
        <Typography variant="title" color="inherit" noWrap className={props.classes.toolbarTitle}>
            <Link to="/" className={props.classes.toolbarLink}>My diary</Link>
        </Typography>
    </React.Fragment>


export default withStyles(styles)(Logo)