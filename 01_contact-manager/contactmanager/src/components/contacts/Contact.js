import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Consumer } from '../../context'


class Contact extends Component {
    state = {
        showContactInfo: false
    }

    onDeleteClick = (id, dispatch) => {
        dispatch({ type: 'DELETE_CONTACT', payload: id })
    }

    render() {
        const { name, email, phone, id } = this.props.contact
        const { showContactInfo } = this.state

        return (
            <Consumer>
                {value => {
                    const { dispatch } = value
                    return (
                        <div className="card card-body mb-3">
                            <h4>{name}{' '} <i style={{ cursor: 'pointer' }} onClick={() => this.setState({ showContactInfo: !this.state.showContactInfo })} className="fas fa-sort-down"></i>
                                <i style={{ cursor: 'pointer', float: 'right', color: 'red' }} onClick={this.onDeleteClick.bind(this, id, dispatch)} className="fas fa-times"></i></h4>
                            {showContactInfo ? (
                                <ul className="list-group">
                                    <li className="list-group-item">Email: {email}</li>
                                    <li className="list-group-item">Phone: {phone}</li>
                                </ul>
                            ) : null}
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}

Contact.propTypes = {
    contact: PropTypes.object.isRequired,
}

export default Contact
