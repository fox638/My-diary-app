import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import history from '../history'
import saga from './saga'


const sagaMiddleware = createSagaMiddleware()

const enhancer = applyMiddleware(
    sagaMiddleware,
    routerMiddleware(history),
    logger
)

const store = createStore(connectRouter(history)(reducer), enhancer)

//sagaMiddleware.run(saga)


window.store = store

export default store