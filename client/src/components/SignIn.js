import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '../components/SignIn.css';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import {signIn} from '../api/auth';
import {showErrorMsg} from '../helpers/messages';
import {showLoading} from '../helpers/loading';

const SignIn = ()  => {
    const [data,setData] = useState({
        email:'',
        password:'',
        errorMsg:false,
        loading:false,
        redirectToDashboard: false
    })

    const {email,password,errorMsg,loading,redirectToDashboard} = data;

    const handleChange = e =>{
        setData({
            ...data,
            [e.target.name]: e.target.value,
            errorMsg:''
        })
    }

    const handleSubmit = e =>{
        e.preventDefault();
        //client side validation
        if(isEmpty(email) || isEmpty(password)){
            setData({
                ...data,
                errorMsg:'All Fields are required..'
            })
        } else if(!isEmail(email)){
            setData({
                ...data,
                errorMsg:'Invalid Email'
            })
        }  else {
            // success
            const {email,password} = data;
            const formData = {email,password}
            setData({
                ...data,
                loading:true
            })

            signIn(formData)
        }
    }

    return (
        <div className="signin-container">
        <div className="row px-2 vh-100">
            <div className="col-md-5 mx-auto align-self-center">
                    {errorMsg && showErrorMsg(errorMsg)}
                    {loading && (<div className="text-center pb-4">{showLoading()}</div>)}
            <form className="signup-form mt-5" onSubmit={handleSubmit}>

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
                <input onChange={handleChange} name="password" value={password} type="password" placeholder="Enter Password" className="form-control" />
            </div>

            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">
                    Log In
                </button>
            </div>
            <p className="text-center text-white">
                Dont' Have an Account?? <Link to="/signup">Register Here</Link>
            </p>
           </form>
            </div>
        </div>
    </div>
    )
}

export default SignIn
