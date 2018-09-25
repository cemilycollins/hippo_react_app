export const ROOT_URL = "http://localhost:3000"

export function fetchHospitals() {
  return function(dispatch) {
    fetch(ROOT_URL + "/hospitals")
      .then(r => r.json())
      .then(json => dispatch({type: "FETCH_HOSPITALS", hospitals: json}))
  }
}

export function updateUser(user) {
  return {type: "UPDATE_USER", user: user }
}

export function logoutUser() {
  localStorage.clear()
  return {type: "UPDATE_USER", user: null}
}

export function addReview(review) {
  return function(dispatch) {
    fetch(ROOT_URL + `/hospitals/${review.hospital_id}`)
      .then(r => r.json())
      .then(json => dispatch({type: "ADD_REVIEW", review: review, hospital: json}))
  }
}

export function editReview(review) {
  return function(dispatch) {
    fetch(ROOT_URL + `/hospitals/${review.hospital_id}`)
      .then(r => r.json())
      .then(json => dispatch({type: "EDIT_REVIEW", review: review, hospital: json}))
  }
}

export function deleteReview(review) {
  return function(dispatch) {
    fetch(ROOT_URL + `/hospitals/${review.hospital_id}`)
      .then(r => r.json())
      .then(json => dispatch({type: "DELETE_REVIEW", review: review, hospital: json}))
  }
}

export function fetchUsers() {
  return function(dispatch) {
    fetch(ROOT_URL + "/users")
      .then(r => r.json())
      .then(json => dispatch({type: "FETCH_USERS", users: json}))
  }
}
