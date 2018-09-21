import React from 'react'

const ReviewCard = props => {
  const review = props.review
  return (
    <div className="ui card" >
      <div className='ui content'>
        <div className='ui header'><i className="yellow star icon" /> Rating: {review.rating}/5</div>
        <div className='meta'>Date: {review.date}</div>
        <div className='description'>
          <p>"{review.body}"</p>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard
