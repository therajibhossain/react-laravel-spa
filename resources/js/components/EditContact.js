import axios from 'axios';
import React, { Component } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

class EditContact extends Component {
    state = {
        name: "",
        email: "",
        phone: "",
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    updateContact = async (e) => {
        e.preventDefault();
        const id = this.props.params.id;
        const res = await axios.put(`/contacts/${id}`, this.state).then((result) => {
            if(result.data.status === 200){
                this.setState({
                    name: "",
                    email: "",
                    phone: "",
                });
    
                this.props.navigate("/");
            }
        });        
    }

    getContact = async () => {
        const id = this.props.params.id;
        await axios.get(`/contacts/${id}/edit`).then((result) => {
            const contact = result.data.contact;
            this.setState({
                name: contact.name,
                email: contact.email,
                phone: contact.phone,
            });            
        });
    }

    componentDidMount() {        
        this.getContact();
    }

    render() { 
        let {name, email, phone} = this.state;
        
        return ( <>
            <br />
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-5'>
                    <h1>Edit Contact</h1> <hr />
                    <form onSubmit={this.updateContact}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" placeholder="Your Name" name="name" value={name} onChange={(e) => this.handleChange(e)} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" placeholder="name@example.com" name="email" value={email} onChange={(e) => this.handleChange(e)} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input type="text" className="form-control" id="phone" placeholder="123456789"  name="phone" value={phone} onChange={(e) => this.handleChange(e)} />
                        </div>

                        <div className="mb-3">                        
                            <input type="submit" className="btn btn-primary" value="Update" />
                        </div>
                    </form>
                </div>
            </div>
        </> );
    }
}

const withNavigate = (props) => {
    let navigate = useNavigate();
    let params = useParams();

    return <EditContact {...props} navigate={navigate} params={params} />
}

export default withNavigate;