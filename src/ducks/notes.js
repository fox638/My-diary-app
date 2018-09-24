import {appName} from '../config'
import {Record, OrderedMap} from 'immutable'
import { call, put, all, takeEvery, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import {fbDatatoEntities} from './utils'
import firebase from 'firebase'
import {createSelector} from 'reselect'
import {SIGN_OUT_SUCCESS} from './auth'



const ReducerState = Record({
    entities: new OrderedMap({}),
    loading: false,
    loaded:false
})

const NoteRecord = Record({
    uid:null,
    title:null,
    date:null,
    content:null,
    contentLoading: false,
    contentLoaded: false,
})

export const moduleName = 'notes'
const prefix = `${appName}/${moduleName}`

export const EFTCH_ALL_NOTE_REQUEST = `${prefix}/EFTCH_ALL_NOTE_REQUEST`
export const EFTCH_ALL_NOTE_SUCCESS = `${prefix}/EFTCH_ALL_NOTE_SUCCESS`
export const EFTCH_ALL_NOTE_ERROR = `${prefix}/EFTCH_ALL_NOTE_ERROR`

export const FETCH_NOTE_REQUEST = `${prefix}/FETCH_NOTE_REQUEST`
export const FETCH_NOTE_SUCCESS = `${prefix}/FETCH_NOTE_SUCCESS`
export const FETCH_NOTE_ERROR = `${prefix}/FETCH_NOTE_ERROR`


export const ADD_NOTE_REQUEST = `${prefix}/ADD_NOTE_REQUEST`
export const ADD_NOTE_SUCCESS = `${prefix}/ADD_NOTE_SUCCESS`
export const ADD_NOTE_ERROR = `${prefix}/ADD_NOTE_ERROR`

export const EDIT_NOTE_REQUEST = `${prefix}/EDIT_NOTE_REQUEST`
export const EDIT_NOTE_SUCCESS = `${prefix}/EDIT_NOTE_SUCCESS`
export const EDIT_NOTE_ERROR = `${prefix}/EDIT_NOTE_ERROR`

export default function reducer(state = new ReducerState(), action) {
    const {type, payload} = action 

    switch(type) {
        case EFTCH_ALL_NOTE_REQUEST:
            return state.set('loading', true)

        case EFTCH_ALL_NOTE_SUCCESS:
            return state
                    .set('loading', false)
                    .set('loaded', true)
                    .set('entities', fbDatatoEntities(payload, NoteRecord))

        case FETCH_NOTE_REQUEST:
            return state
                    .setIn(['entities', payload.noteUid, 'contentLoading'], true)

        case FETCH_NOTE_SUCCESS:
            return state
                    .setIn(['entities', payload.noteUid, 'contentLoading'], false)
                    .setIn(['entities', payload.noteUid, 'contentLoaded'], true)
                    .setIn(['entities', payload.noteUid, 'content'], payload.data.content ) 
        case EDIT_NOTE_SUCCESS:
                
            return state
                    .setIn(['entities', payload.uid, 'content'], payload.content)
                    .setIn(['entities', payload.uid, 'title'], payload.title)
        case  ADD_NOTE_SUCCESS:
            return state
                    .setIn(['entities', payload.uid], new NoteRecord(payload))
                    .setIn(['entities', payload.uid, "contentLoaded"], true)
        case SIGN_OUT_SUCCESS:
            return new ReducerState()
        default:
            return state
    }
}
export const stateSelector = state => state[moduleName]
export const mathParamSelector = (_, props) => {
    const {match} = props

    return match.params
}
export const uidSelectop = createSelector(mathParamSelector, ({uid}) => uid)
export const entitiesSelector = createSelector(stateSelector, state => state.entities)
export const noteListSelector = createSelector(entitiesSelector, entities => entities.valueSeq().toArray())
export const loadingSelector = createSelector(stateSelector, state => state.loading)
export const loadedSelector = createSelector(stateSelector, state => state.loaded)
export const noteSelector = createSelector(entitiesSelector, uidSelectop, (notes, uid)=> notes.get(uid))

export function addNote(note){
    return {
        type:ADD_NOTE_REQUEST,
        payload: note
        
    }
}

export function editNote(note){
    return {
        type:EDIT_NOTE_REQUEST,
        payload:note
    }
}

export function loadAllNoteIndex(user) {
    return {
        type:EFTCH_ALL_NOTE_REQUEST,
        payload:user
    }
}

export function loadNoteContent(noteUid, userUid) {
    return {
        type:FETCH_NOTE_REQUEST,
        payload:{noteUid, userUid}
    }
}

const createNoteSoket = () => eventChannel(emmit => {

})

export const addNoteSaga = function * ({payload}) {
    const {content, title, date, userUid} = payload
    const noteIndexRef = firebase.database().ref(`users/${userUid}/noteIndex`)

   
    try {
         const refIndex = yield call([noteIndexRef, noteIndexRef.push], {
            title,
            date,
        })
        const notesRef = firebase.database().ref(`users/${userUid}/content/${refIndex.key}`)

        yield call([notesRef, notesRef.set], {
            content
        })

        yield put({
            type: ADD_NOTE_SUCCESS,
            payload:{
                ...payload,
                uid:refIndex.key
            }
        })
       
    } catch (error) {
        yield put({
            type:ADD_NOTE_ERROR,
            error
        })
    }
}

export const fetchAllSaga = function * ({payload}) {
    
    const noteIndexRef = firebase.database().ref(`users/${payload.uid}/noteIndex`)
    try {
        const data = yield call([noteIndexRef, noteIndexRef.once], "value")

        console.log(data.val())
      

        yield put({
            type:EFTCH_ALL_NOTE_SUCCESS,
            payload: data.val(),
                
        })
    } catch (error) {
        yield put({
            type: EFTCH_ALL_NOTE_ERROR,
            error
        })
    }
}

export const loadNoteContentSaga = function * ({payload}) {
    
    const notesRef = firebase.database().ref(`users/${payload.userUid}/content/${payload.noteUid}`)
    try{
        const data = yield call([notesRef, notesRef.once], 'value')
       
        yield put({
            type:FETCH_NOTE_SUCCESS,
            payload:{
                ...payload,
                data: data.val()
            }
        })
    } catch (error) {
        yield put({
            type:FETCH_NOTE_ERROR,
            error
        })
    }
    

   
}

export const editNoteSaga = function * ({payload}) {
    const notesRef = firebase.database().ref(`users/${payload.userUid}/content/${payload.uid}`)
    const noteIndexRef = firebase.database().ref(`users/${payload.userUid}/noteIndex/${payload.uid}`)
 
    try{
        yield put({
            type:EDIT_NOTE_SUCCESS,
            payload
        })

        yield call([notesRef, notesRef.set], {
            content:payload.content
            
        })
        yield call([noteIndexRef, noteIndexRef.set], {
            date:payload.date,
            title:payload.title
        })

       

    }catch (error){
        yield put({
            type:EDIT_NOTE_ERROR,
            error
        })
    }
   
}


export const saga = function * () {
    yield all([
        takeEvery(ADD_NOTE_REQUEST, addNoteSaga),
        takeEvery(EFTCH_ALL_NOTE_REQUEST, fetchAllSaga),
        takeEvery(FETCH_NOTE_REQUEST, loadNoteContentSaga),
        takeEvery(EDIT_NOTE_REQUEST, editNoteSaga)
    ])
}