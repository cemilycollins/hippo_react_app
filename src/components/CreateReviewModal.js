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
      modalOpen: !this.state.modalOpen
    })
  }

  render() {
  return (
    <Modal trigger={<Button onClick={this.handleModal} className="ui purple button" style={{'margin-bottom': "15px"}}>Add Review</Button>}>
      {this.props.id && this.props.user ? <div>
      <Modal.Content>
        <CreateReviewForm id={this.props.id} hospitalName={this.props.hospitalName} closeModal={this.handleModal}/>
      </Modal.Content></div> : <Modal.Content><h3 style={{color: "red"}}>Please <Link to='/login'>Log In</Link> to add a review!</h3></Modal.Content>}
    </Modal>
  )}
}
const mapStateToProps = ({user}) => ({user})

export default connect(mapStateToProps)(CreateReviewModal)
