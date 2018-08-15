import { all } from 'redux-saga/effects'
import { saga as authSaga} from '../ducks/auth'

export default function * () {
    yield all([authSaga()])
}