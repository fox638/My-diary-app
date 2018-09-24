import React, { Component, Fragment } from 'react'
import {
    withStyles, 
    Button,
    Paper,
    TextField,

} from '@material-ui/core'
import { connect } from 'react-redux'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import {
    addNote,
    loadAllNoteIndex,
    noteListSelector,
    loadingSelector,
    noteSelector,
    loadNoteContent,
    editNote

} from '../../../ducks/notes'
import {
    userSelector
} from '../../../ducks/auth'

const styles = theme => ({
    paper:{
        padding:theme.spacing.unit * 3
      },
      button:{
        margin:`${theme.spacing.unit * 2}px  ${theme.spacing.unit * 2}px`,
      }
})

class Note extends Component {
    state = {
        editorState: EditorState.createEmpty(),
        title:''
    }

    componentWillReceiveProps() {
        const {loading, note, loadNoteContent, user} = this.props
        !loading && note && !note.contentLoading && !note.contentLoaded && loadNoteContent(note.uid, user.uid)

        if(note && note.contentLoaded) {
            const content = convertFromRaw(JSON.parse(note.content))
            this.setState({
                ...note.toJS(),
                editorState:EditorState.createWithContent(content),
                
               
            })
        }
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
          })
    }

    handleSaveNote = () => {
        const {user, addNote, editNote} = this.props
        const {editorState, title, uid, date, userUid } = this.state
        const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        if (!uid) return this.props.addNote({
            ...this.state, 
            content,
            date: Date.now(),
            userUid:user.uid
        })
        editNote({...this.state, content, userUid:user.uid})

        
        
     
      }

      handleChange = name => event => {
        this.setState({
          [name]:event.target.value
        })
      }

    render(){
        const { classes, note } = this.props
        const {editorState, title} = this.state
        return (
            <Fragment>
                <div>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick = {this.handleSaveNote}
                    >
                        Сохранить
                    </Button>
                    <TextField value={title} label="Заголовок заметки" margin="normal" onChange={this.handleChange("title")}/>
                </div>
                <Paper className={classes.paper}>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange = {this.onEditorStateChange}
                    />
                </Paper>
            </Fragment>
        )
        
    }
}

export default withStyles(styles)(connect(
    (state, ownProps) => ({
        loading:loadingSelector(state),
        user:userSelector(state),
        note:noteSelector(state, ownProps),

    }), {
        addNote,
        loadNoteContent,
        editNote
    },
    null,
    {pure: false}
)(Note))