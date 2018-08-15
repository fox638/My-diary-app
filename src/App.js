import React, {Component} from 'react'
import { Switch, Route, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import styled from 'styled-components'

import Header from './components/Partials/Header'




class App extends Component {
    render() {
        return (
            <div className='wrapper'>
                <Header/>
                
            </div>
        )
    }
}

export default App