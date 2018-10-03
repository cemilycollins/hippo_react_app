import React from 'react'
import ReviewCard from '../components/ReviewCard'

const ReviewContainer = props => {
  return (
    <div>
      <p></p>
      {props.reviews.length > 0 ?
        <div className="ui cards">
          {props.reviews.map(review => <ReviewCard review={review}/>)}
        </div> : <h3>Loading...</h3>}
    </div>
  )
}

export default (ReviewContainer)
