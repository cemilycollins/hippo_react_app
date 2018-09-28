import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import CreateReviewForm from './CreateReviewForm'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class CreateReviewModal extends React.Component {
  state = {
    modalOpen: false
  }

  handleModal = () => {
    this.setState({
      modalOpen: true
    })
  }

  handleClose = () => {
    this.setState({
      modalOpen: false
    })
  }

  render() {
  return (
    <Modal trigger={<Button onClick={this.handleModal}
      className="ui purple button"
      style={{'margin-bottom': "15px"}}>Add Review</Button>}
      open={this.state.modalOpen}
      onClose={() => {this.setState({modalOpen: false})}}>
      {this.props.id && this.props.user ? <div>
      <Modal.Content>
        <CreateReviewForm id={this.props.id} hospitalName={this.props.hospitalName} closeModal={this.handleClose}/>
      </Modal.Content></div> : <Modal.Content><h3 style={{color: "red"}}>Please <Link to='/login'>Log In</Link> to add a review!</h3></Modal.Content>}
    </Modal>
  )}
}
const mapStateToProps = ({user}) => ({user})

export default connect(mapStateToProps)(CreateReviewModal)
