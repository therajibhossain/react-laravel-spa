import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EditContact from './EditContact';

class Contact extends Component {
    state = {
        contacts: []
    }

    getContacts = async () => {
        await axios.get("contacts").then((result) => {
            this.setState({
                contacts: result.data.contacts
            });
        });
    }

    deleteContact = async (id) => {
        await axios.delete(`/contacts/${id}`).then((result) => {
            this.setState({
                contacts: []
            });

            this.getContacts();
        });
    }

    componentDidMount() {
        this.getContacts();
    }

    render() { 
        let {contacts} = this.state; console.log(contacts)

        return ( <>
            <br />
            <div className='row'>
                <div className='col-md-2'></div>
                <div className='col-md-8'>
                    <h1>All Contacts</h1><hr />

                    <table className="table">
                        <thead className="table-light">
                            <tr>
                                <th>#ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                        {contacts.map((contact, index) => {
                            return (
                                <tr key={index}>
                                    <td>{contact.id}</td>
                                    <td>{contact.name}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.phone}</td>
                                    <td>
                                        <Link to={`edit-contact/${contact.id}`} element={<EditContact />} className='btn btn-sm btn-primary'>Edit</Link> &nbsp; 
                                        <a onClick={() => this.deleteContact(contact.id)} className='btn btn-sm btn-danger'>Delete</a>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>            
        </> );
    }
}
 
export default Contact;