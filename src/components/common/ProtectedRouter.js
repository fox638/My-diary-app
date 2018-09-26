import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {isAuthorizedSelector} from '../../ducks/auth'


class ProtectedRouter extends Component {
    render() {
        const {component, ...rest} = this.props
        return <Route {...rest}render={this.renderProtected}/>
 
    }

    renderProtected = (routeProps) => {
        const {component: ProtectedComponent, authorized, location } = this.props
        return authorized ? <ProtectedComponent {...routeProps}/> : <Redirect to={{pathname:"/auth/sign-in", state:{ from: location}}}/>
    }
}


export default connect(state => ({
    authorized: isAuthorizedSelector(state)
}), null, null, {pure:false})(ProtectedRouter)

//"/auth/sign-in"