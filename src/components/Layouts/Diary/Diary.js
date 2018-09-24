import React, { Component, Fragment } from 'react'
import { Grid, Paper, Typography, List, ListItem, ListItemText, withStyles, Button, TextField } from '@material-ui/core'
import { connect } from 'react-redux'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import {addNote, loadAllNoteIndex, moduleName as notesModule, noteListSelector, loadingSelector} from '../../../ducks/notes'
import {moduleName as authModule } from '../../../ducks/auth'
import {Route} from 'react-router-dom'

import NoteList from './NoteList'
import Note from './Note'



const styles = theme => ({
  paper:{
    padding:theme.spacing.unit * 3
  },
  button:{
    margin:`${theme.spacing.unit * 2}px  ${theme.spacing.unit * 2}px`,
  }
})

class Diary extends Component {

  render() {
    
    return (
      <Grid container >
        <Grid item sm={3}>
          <NoteList/>
        </Grid>
        <Grid item sm={9}>
          <Route path="/diary/:uid" component={Note}/>
          <Route exact path="/diary" component={Note}/>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(
  connect(state => ({
    loading:loadingSelector(state),
    notes:noteListSelector(state),
    user: state[authModule].user
  }), {addNote, loadAllNoteIndex})(Diary)
)