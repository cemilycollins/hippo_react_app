const ROOT_URL = "http://localhost:3000"

export function fetchHospitals() {
  return function(dispatch) {
    fetch(ROOT_URL + "/hospitals")
      .then(r => r.json())
      .then(json => dispatch({type: "FETCH_HOSPITALS", hospitals: json}))
  }
}
