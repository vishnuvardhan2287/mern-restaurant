import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './SignUp.css';

const SignUp = ()  => {
    const [data,setData] = useState({
       userName:'',
       email:'',
       password:'',
       password2:'',
       successMsg:false,
       errorMsg:false,
       loading: false
    })

    const {userName,email,password,password2,successMsg,errorMsg,loading} = data;

    const handleChange = e =>{
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e =>{
        e.preventDefault();
        console.log(data);
    }
    
    return (
        <div className="img-container">
            <div className="row px-2 vh-100">
                <div className="col-md-5 mx-auto align-self-center">
                <form className="signup-form mt-5" onSubmit={handleSubmit}>
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" >
                            <i className="fa fa-user" />
                        </span>
                    </div>
                    <input onChange={handleChange} name="userName" value={userName} type="text" placeholder="Username" className="form-control" />
                </div>

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fa fa-envelope" />
                        </span>
                    </div>
                    <input onChange={handleChange} name="email" value={email} type="text" placeholder="Email.." className="form-control" />
                </div>

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fa fa-lock" />
                        </span>
                    </div>
                    <input onChange={handleChange} name="password" value={password} type="password" placeholder="Create Password" className="form-control" />
                </div>

                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fa fa-lock" />
                        </span>
                    </div>
                    <input onChange={handleChange} name="password2" value={password2} type="password" placeholder="Confirm Password" className="form-control" />
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">
                        Create an Account
                    </button>
                </div>
                <p className="text-center text-white">
                    Have an Account?? <Link to="/signin">Sign In</Link>
                </p>
               </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp
