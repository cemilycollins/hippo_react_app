export const ROOT_URL = "http://localhost:3000"

function fetchHospital(action, review) {
  return function(dispatch) {
    fetch(ROOT_URL + `/hospitals/${review.hospital_id}`)
      .then(r => r.json())
      .then(json => dispatch({type: action, review: review, hospital: json}))
  }
}

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
  return fetchHospital("ADD_REVIEW", review)
}

export function editReview(review) {
  return fetchHospital("EDIT_REVIEW", review)
}

export function deleteReview(review) {
  return fetchHospital("DELETE_REVIEW", review)
}

export function updateMapCenter(props) {
  return {type: "UPDATE_CENTER", props: props }
}
