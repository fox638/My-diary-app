import firebase from 'firebase'
import {appName} from '../config'
import {Record} from 'immutable'
import { createSelector } from 'reselect'
import { takeEvery, put, call, apply, take, all, select} from 'redux-saga/effects'
import {eventChannel} from 'redux-saga'
import { replace, push } from 'connected-react-router'
import { toast } from 'react-toastify'

import {fromPathSelect} from './router'




/**
 * Constants
 */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`
export const SIGN_IN_REQUESTS_LIMIT = `${prefix}/SIGN_IN_REQUESTS_LIMIT`
export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`
export const SIGN_OUT_REQUEST =  `${prefix}/SIGN_OUT_REQUEST`
export const SIGN_OUT_SUCCESS = `${prefix}/SIGN_OUT_SUCCESS`
export const SIGN_OUT_ERROR = `${prefix}/SIGN_OUT_ERROR`

export const SEND_EMAIL_VALIDATION_REQUEST = `${prefix}/SEND_EMAIL_VALIDATION_REQUEST`
export const SEND_EMAIL_VALIDATION_SUCCESS = `${prefix}/SEND_EMAIL_VALIDATION_SUCCESS`

export const RESET_PASSWORD_REQUEST = `${prefix}/RESET_PASSWORD_REQUEST`
export const RESET_PASSWORD_SUCCESS = `${prefix}/RESET_PASSWORD_SUCCESS`


/**
 * Reducer
 */

export const ReducerRecord = Record({
    user: null
})

export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload } = action

    switch (type) {
        case SIGN_IN_SUCCESS:
        case SIGN_OUT_SUCCESS:        
            return state.set('user', payload.user)
        
        default:
            return state
    }
}

/**
 * Selector 
 */

 export const userSelector = (state) => state[moduleName].user
 export const isAuthorizedSelector = createSelector(
     userSelector,
     (user) => !!user
 )

 /**
  * Action Creators
  */

  export function signIn(email, password) {
      return {
          type: SIGN_IN_REQUEST,
          payload: {
              email, 
              password
          }
      }
  }

  export function signUp(email, password) {
      
      return {
          type: SIGN_UP_REQUEST,
          payload: { email, password}
      }
  }

  export function signOut() {
      return {
          type: SIGN_OUT_REQUEST
      }
  }

  export function resetPassword(email) {
      return {
          type: RESET_PASSWORD_REQUEST,
          payload: { email }
      }
  }


/**
 * Sagas
 */

 export function * signUpSaga({ payload }) {
     const auth = firebase.auth()

     try {
         const user = yield call(
            [auth, auth.createUserWithEmailAndPassword],
            payload.email,
            payload.password
         )
                
        yield put({
            type: SEND_EMAIL_VALIDATION_REQUEST
        })
        

        yield put({
             type:SIGN_UP_SUCCESS,
             payload:{ user }
         })
     } catch (error) {
         console.log(error)
         yield put({
             type: SIGN_UP_ERROR,
             error
         })
     }
 }

export function * signUpErrorSaga({ error }){
    yield toast.error(error.message)
}
export function * signInErrorSaga({ error }){
    yield toast.error(error.message)
}


export function * signInSaga() {
    for (let i = 0; i < 3; i++) {
        const { payload } = yield take(SIGN_IN_REQUEST)

        const auth = firebase.auth()

        try {
            yield apply(auth, auth.signInWithEmailAndPassword, [
                payload.email,
                payload.password
            ])

            const from = yield select(fromPathSelect)

           // yield put(push(from.pathname))
           // console.log('Saga FROM', from)



        } catch (error) {
            yield put({
                type: SIGN_IN_ERROR,
                error
            })
        }
    }

    yield put({
        type: SIGN_IN_REQUESTS_LIMIT
    })
}

export function * signOutSaga() {
    const auth = firebase.auth()

    try {
        yield call([auth, auth.signOut])
        yield put({
            type: SIGN_OUT_SUCCESS,
            payload:{
                user:null
            }
        })
    } catch(error) {
        yield put({
            type: SIGN_OUT_ERROR,
            error
        })
    }
}




 const createAuthChannel = () => 
    eventChannel((emit)=> 
        firebase.auth().onAuthStateChanged((user)=> emit({ user }))
    )   

export const watchStatusChangeSaga = function * () {
    const chan = yield call(createAuthChannel)
    while(true) {
        const { user } = yield take(chan)

        if (user) {
            yield put({
                type: SIGN_IN_SUCCESS,
                payload: { user }
            })
            const from = yield select(fromPathSelect)
            console.log('location chenge !!!', from)
            console.log('pathhame', from.from.pathname)
            yield put(push(from.from.pathname))

        } else {
            yield put({
                type: SIGN_OUT_SUCCESS,
                payload:{user}
            })
            //yield put(replace('/auth/sign-in'))
        }
    }
}


export const sendEmailVerificationSaga = function * () {
    const currentUser = firebase.auth().currentUser
    try {
        yield call([currentUser, currentUser.sendEmailVerification])
        yield put({
            type:SEND_EMAIL_VALIDATION_SUCCESS
        })
    } catch (error){

    }
    


}

export const resetPasswordSaga = function * ({payload}){
    const auth = firebase.auth()
    try {
        yield call([auth, auth.sendPasswordResetEmail], payload.email)

        put({
            type:RESET_PASSWORD_SUCCESS
        })
    } catch (error) {
        console.error(error)
    }
    


}

export function * saga() {
    yield all([
        takeEvery(SIGN_UP_REQUEST, signUpSaga),
        takeEvery(SIGN_UP_ERROR, signUpErrorSaga),
        takeEvery(SIGN_OUT_REQUEST, signOutSaga),
        takeEvery(SIGN_IN_ERROR, signInErrorSaga),
        takeEvery(SEND_EMAIL_VALIDATION_REQUEST, sendEmailVerificationSaga),
        takeEvery(RESET_PASSWORD_REQUEST, resetPasswordSaga),
        signInSaga(),
        watchStatusChangeSaga()
    ])
}