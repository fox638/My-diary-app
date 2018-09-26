import { createSelector } from 'reselect'

export const moduleName = 'router'

export const stateSelector = state => state[moduleName] 

export const fromPathSelect = createSelector(stateSelector, state => {
    console.log('Router State', state)
   return state.location.state || { from: { pathname: "/" } }  
})