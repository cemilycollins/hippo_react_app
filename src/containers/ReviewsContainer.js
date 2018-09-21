import React from 'react'
import ReviewCard from '../components/ReviewCard'

const ReviewContainer = props => {
  return (
    <div>
      {props.reviews.length > 0 ?
        <div className="ui cards">
          {props.reviews.map(review => <ReviewCard review={review}/>)}
        </div> : null}

    </div>
  )
}

export default (ReviewContainer)
