import React, { Component, Fragment, Children } from 'react'
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

import firebase from 'firebase'

import { debounce } from 'lodash'



const styles = theme => ({
    paper:{
        padding:theme.spacing.unit * 3
      },
      button:{
        margin:`${theme.spacing.unit * 2}px  ${theme.spacing.unit * 2}px`,
      }
})

class Note extends Component {

    constructor(param){
        super(param)
        this.debounceSave = debounce(this.handleSaveNote, 5000)
    }

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
        this.debounceSave()
        
    }

    handleSaveNote = () => {
        const {user, addNote, editNote} = this.props
        const {editorState, title, uid, date, userUid } = this.state
        const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        if (!uid) return addNote({
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
                        toolbar={{
                            image:{
                                uploadCallback: uploadImageCallBack,
                                previewImage:true
                            }
                        }}
                    />
                </Paper>
            </Fragment>
        )
        
    }
}


function uploadImageCallBack(file) {
    const storageRef = firebase.storage().ref();
    return new Promise(
      (resolve, reject) => {
        var metadata = {
            contentType: 'image/jpeg'
          };
          
        var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, function(error) {
      
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
          console.log('User doesnt have permission to access the object')
            // User doesn't have permission to access the object
            break;
      
          case 'storage/canceled':
            // User canceled the upload
            break;
      
              
          case 'storage/unknown':
          console.log('Unknown error occurred, inspect error.serverResponse')
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, function() {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
          resolve({data: {link:downloadURL}})
        });
      });
      }
    );
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