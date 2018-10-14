import React, { Fragment } from 'react'
import { Paper, Typography, withStyles, ListItem, ListItemText, List, Button, ListItemSecondaryAction } from '@material-ui/core'
import { connect } from 'react-redux'
import { noteListSelector, loadingSelector, loadAllNoteIndex, loadedSelector, deleteNote } from '../../../ducks/notes'
import {userSelector} from '../../../ducks/auth'
import {Link} from 'react-router-dom'

const styles = theme => ({
   paper:{
       padding: theme.spacing.unit * 3
   }
})


class NoteList extends React.Component {

    componentWillMount(){
       
    }

    componentWillReceiveProps() {
        const {user, loading, loaded, loadAllNoteIndex} = this.props

        user && !loading && !loaded && loadAllNoteIndex(user)
    }

    renderListItem = () => {
        const {notes, loading}  = this.props
        if(loading) return <h1>Loading</h1>

        return notes.map(note => (
           
                <ListItem key={note.uid} to={`/diary/${note.uid}`} component={Link} button>
                    <ListItemText primary={note.title}/>
                    <ListItemSecondaryAction>
                        <Button onClick={this.handleDellNoteButton(note.uid)} color="primary">Удалить</Button>
                    </ListItemSecondaryAction>
                </ListItem>
           
           
        ))
        
    }
    handleDellNoteButton = noteUid => () => {
        const {user, deleteNote} = this.props
        deleteNote(noteUid, user.uid)
        
    }

    
    render() {
        const { classes } = this.props
        return (
            <Fragment>
                <Paper className={classes.paper}>
                    <List component="ul">
                        {this.renderListItem()}
                    </List>
                </Paper>
            </Fragment>
        )
    }
}

export default withStyles(styles)(connect(
    state => ({
        loading:loadingSelector(state),
        loaded:loadedSelector(state),
        notes:noteListSelector(state),
        user: userSelector(state),
    }),{
        loadAllNoteIndex,
        deleteNote
    },
    null,
    {pure: false}
    

)(NoteList))