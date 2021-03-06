import {combineReducers} from "redux"

function formatJson(json) {
  return {
    rating_average: json.rating_average,
    total_reviews: json.total_reviews
  }
}

function hospitalsReducer(state = [], action) {
  switch (action.type) {
    case "FETCH_HOSPITALS":
      return action.hospitals
    case "ADD_REVIEW":
      let hospitals = state.map(h => {
        if (h.id === action.review.hospital_id) {
          return {...h, ...formatJson(action.hospital)}
        } else {
          return h
        }
      })
      return hospitals
    case "EDIT_REVIEW":
      let newHospitals = state.map(h => {
        if (h.id === action.review.hospital_id) {
          return {...h, ...formatJson(action.hospital)}
        } else {
          return h
        }
      })
      return newHospitals
    case "DELETE_REVIEW":
    return state.map(h => {
      if (h.id === action.review.hospital_id) {
        return {...h, ...formatJson(action.hospital)}
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
      let user2 = {...state}
      user2.reviews.push(action.review)
      return user2
    case "ADD_ALL_REVIEWS":
      let user = {...state}
      user.reviews = action.reviews
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

function mapReducer(state = {
  center: {
    lat: 39.8283,
    lng: -98.5795
  },
  zoom: 4
}, action) {
  switch (action.type) {
    case "UPDATE_CENTER":
      return action.props
    default:
      return state
  }
}

function showHospitalReducer(state = null, action) {
  switch (action.type) {
    case "ADD_REVIEW":
      return action.hospital
    case "EDIT_REVIEW":
      return action.hospital
    case "DELETE_REVIEW":
      return action.hospital
    case "SET_SHOW_HOSPITAL":
      return action.hospital
    default:
      return state
  }
}

function proceduresReducer(state = [], action) {
  switch (action.type) {
    case "SET_PROCEDURES":
      return action.procedures
    case "ADD_PROCEDURES":
      return [...state, ...action.procedures]
    default:
      return state
  }
}


const rootReducer = combineReducers({
  hospitals: hospitalsReducer,
  user: userReducer,
  mapCenter: mapReducer,
  showHospital: showHospitalReducer,
  procedures: proceduresReducer
})

export default rootReducer
