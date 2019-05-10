import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Consumer } from '../../context'
import axios from 'axios'


class Contact extends Component {
    state = {
        showContactInfo: false
    }

    onDeleteClick = async (id, dispatch) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
            dispatch({ type: 'DELETE_CONTACT', payload: id })
        } catch (e) {
            dispatch({ type: 'DELETE_CONTACT', payload: id })
        }
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
                                <i style={{ cursor: 'pointer', float: 'right', color: 'red' }} onClick={this.onDeleteClick.bind(this, id, dispatch)} className="fas fa-times"></i>
                                <Link to={`contact/edit/${id}`}>
                                    <i
                                        className="fas fa-pencil-alt"
                                        style={{
                                            cursor: 'pointer',
                                            float: 'right',
                                            color: 'black',
                                            marginRight: '1em'
                                        }}
                                    ></i>
                                </Link>
                            </h4>
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
