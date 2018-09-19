import {combineReducers} from "redux"

const rootReducer = combineReducers({
  hospitals: hospitalsReducer
})

function hospitalsReducer(state = [], action) {
  switch (action.type) {
    case "FETCH_HOSPITALS":
      return action.hospitals
    default:
      return state
  }
}

export default rootReducer
