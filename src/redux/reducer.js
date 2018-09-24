import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import authReducer, {moduleName as authModule } from '../ducks/auth'
import notesReducer, {moduleName as notesModule } from '../ducks/notes'

export default combineReducers({
    form,
    [authModule]:authReducer,
    [notesModule]:notesReducer,
})