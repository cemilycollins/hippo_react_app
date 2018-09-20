import {combineReducers} from "redux"

const rootReducer = combineReducers({
  hospitals: hospitalsReducer,
  user: userReducer
})

function hospitalsReducer(state = [], action) {
  switch (action.type) {
    case "FETCH_HOSPITALS":
      return action.hospitals
    default:
      return state
  }
}

function userReducer(state = null, action) {
  switch (action.type) {
    case "UPDATE_USER":
      return action.user
    default:
      return state
  }
}

export default rootReducer
