import {combineReducers} from "redux"
import {ROOT_URL} from './actions'

function fetchHospital(id) {
  fetch(ROOT_URL + `/hospitals/${id}`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  }).then(r => r.json())
}

function hospitalsReducer(state = [], action) {
  switch (action.type) {
    case "FETCH_HOSPITALS":
      return action.hospitals
    case "ADD_REVIEW":
      let hospitals = state.map(h => {
        if (h.id === action.review.hospital_id) {
          h.reviews.push(action.review)
          return h
        } else {
          return h
        }
      })
      return hospitals
    case "EDIT_REVIEW":
      let newHospitals = state.map(h => {
        if (h.id === action.review.hospital_id) {
          let newReviews = h.reviews.map(r => {
            if (r.id === action.review.id) {
              return action.review
            } else {
              return r
            }
          })
          h.reviews = newReviews
          return h
        } else {
          return h
        }
      })
      return newHospitals
    case "DELETE_REVIEW":
    return state.map(h => {
      if (h.id === action.review.hospital_id) {
        let newReviews = h.reviews.filter(r => r.id !== action.review.id)
        h.reviews = newReviews
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
      let user = {...state}
      user.reviews.push(action.review)
      return user
    case "EDIT_REVIEW":
      let newReviews = state.reviews.map(r => {
        if (r.id === action.review.id) {
          return action.review
        } else {
          return r
        }
      })
      return {...state, reviews: newReviews}
    case "DELETE_REVIEW":
      let reviews = state.reviews
      let filteredReviews = reviews.filter(r => r.id !== action.review.id)
      return {...state, reviews: filteredReviews}
    default:
      return state
  }
}

function usersReducer(state = [], action) {
  switch (action.type) {
    case "FETCH_USERS":
      return action.users
    default:
      return state
  }
}

const rootReducer = combineReducers({
  hospitals: hospitalsReducer,
  user: userReducer,
  users: usersReducer
})

export default rootReducer
