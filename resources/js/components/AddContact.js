import axios from 'axios';
import React, { Component } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

class AddContact extends Component {
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

    saveContact = async (e) => {
        e.preventDefault();
        const res = await axios.post("contacts", this.state).then((result) => {
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

    render() { 
        const {name, email, phone} = this.state;

        return ( <>
            <br />
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-5'>
                    <h1>Add Contact</h1> <hr />
                    <form onSubmit={this.saveContact}>
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
                            <input type="submit" className="btn btn-primary" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        </> );
    }
}

const withNavigate = (props) => {
    let navigate = useNavigate();
    return <AddContact {...props} navigate={navigate} />
}

export default withNavigate;