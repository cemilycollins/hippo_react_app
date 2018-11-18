export const ROOT_URL = "https://hippo-rails-api.herokuapp.com"


// http://localhost:3000
// https://hippo-rails-api.herokuapp.com

function fetchHospital(action, review) {
  return function(dispatch) {
    fetch(ROOT_URL + `/hospitals/${review.hospital_id}`)
      .then(r => r.json())
      .then(json => dispatch({type: action, review: review, hospital: json}))
  }
}

export function fetchHospitals(latlng) {
  return function(dispatch) {
    fetch(ROOT_URL + `/hospitalquery?lat=${latlng.lat}&lng=${latlng.lng}&range=${0.5}`)
      .then(r => r.json())
      .then(json => {
        dispatch({type: "FETCH_HOSPITALS", hospitals: json})
      })
  }
}

export function addProcedures(json) {
  return ({type: "ADD_PROCEDURES", procedures: json})
}

export function setProcedures(json) {
  return ({type: "SET_PROCEDURES", procedures: json})
}

export function updateUser(user) {
  return {type: "UPDATE_USER", user: user }
}

export function logoutUser() {
  localStorage.clear()
  return {type: "UPDATE_USER", user: null}
}

export function addAllReviews(reviews) {
  return {type: "ADD_ALL_REVIEWS", reviews}
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

export function setShowHospital(hospital) {
  return {type: "SET_SHOW_HOSPITAL", hospital: hospital}
}
