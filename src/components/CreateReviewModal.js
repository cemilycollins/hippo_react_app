import React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import CreateReviewForm from './CreateReviewForm'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const CreateReviewModal = (props) => (
  <Modal trigger={<Button className="ui purple button">Add Review</Button>}>
    {props.id && props.user ? <div><Modal.Header>Your New Review</Modal.Header>
    <Modal.Content>
      <CreateReviewForm id={props.id}/>
    </Modal.Content></div> : <Modal.Content><h3 style={{color: "red"}}>Please <Link to='/login'>Log In</Link> to add a review!</h3></Modal.Content>}
  </Modal>
)

const mapStateToProps = ({user}) => ({user})

export default connect(mapStateToProps)(CreateReviewModal)
