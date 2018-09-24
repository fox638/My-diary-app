import { all } from 'redux-saga/effects'
import { saga as authSaga} from '../ducks/auth'
import { saga as noteSaga} from '../ducks/notes'

export default function * () {
    yield all([
        authSaga(),
        noteSaga()
    ])
    
}