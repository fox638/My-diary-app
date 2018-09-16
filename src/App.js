import React, {Component} from 'react'
import { Switch, Route, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import styled from 'styled-components'
import './config'
import CssBaseline from '@material-ui/core/CssBaseline'

import Header from './components/Partials/Header'

import Index from './components/Layouts/IndexPage'
import Diary from './components/Layouts/Diary'
import About from './components/Layouts/About'
import Auth from './components/User/Auth'


class App extends Component {
    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <Header/>
                
                        <Switch>
                            <Route path="/auth" component={Auth} />
                            <Route path="/diary" component = {Diary}/>
                            <Route path="/about" component = {About}/>
                            <Route path="/" component = {Index} />
                        </Switch>
                
            </React.Fragment>
        )
    }
}

export default App