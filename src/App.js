import React, {Component} from 'react'
import { Switch, Route, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import styled from 'styled-components'
import './config'

import Header from './components/Partials/Header'

import Index from './components/Layouts/IndexPage'
import Diary from './components/Layouts/Diary'
import About from './components/Layouts/About'
import Auth from './components/User/Auth'


class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Header/>
                <div className="wrapper">
                    <div className="base">
                        <Switch>
                            <Route path="/auth" component={Auth} />
                            <Route path="/diary" component = {Diary}/>
                            <Route path="/about" component = {About}/>
                            <Route path="/" component = {Index} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default App