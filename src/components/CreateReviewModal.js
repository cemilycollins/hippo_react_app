import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import CreateReviewForm from './CreateReviewForm'

const CreateReviewModal = () => (
  <Modal trigger={<Button>Add Review</Button>}>
    <Modal.Header>Select a Photo</Modal.Header>
    <Modal.Content>
      <CreateReviewForm id={this.props.id}/>
    </Modal.Content>
  </Modal>
)

export default CreateReviewModal
