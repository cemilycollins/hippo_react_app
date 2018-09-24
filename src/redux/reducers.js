import {combineReducers} from "redux"

const rootReducer = combineReducers({
  hospitals: hospitalsReducer,
  user: userReducer
})

function hospitalsReducer(state = [], action) {
  switch (action.type) {
    case "FETCH_HOSPITALS":
      return action.hospitals
    case "ADD_REVIEW":
      return state.map(h => {
        if (h.id === action.review.hospital_id) {
          h.reviews.push(action.review)
          return h
        } else {
          return h
        }
      })
    case "EDIT_REVIEW":
      return state.map(h => {
        if (h.id === action.review.hospital_id) {
          h.reviews.map(r => {
            if (r.id === action.review.id) {
              return action.review
            } else {
              return r
            }
          })
          return h
        } else {
          return h
        }
      })
    default:
      return state
  }
}

function userReducer(state = null, action) {
  switch (action.type) {
    case "UPDATE_USER":
      return action.user
    case "ADD_REVIEW":
      let user = state
      user.reviews.push(action.review)
      return user
    case "EDIT_REVIEW":
      let user2 = state
      user2.reviews.map(r => {
        if (r.id === action.review.id) {
          return action.review
        } else {
          return r
        }
      })
      return user2
    case "DELETE_REVIEW":
      let user3 = state
      user3.reviews.filter(r => r.id !== action.id)
      return user3
    default:
      return state
  }
}

export default rootReducer
