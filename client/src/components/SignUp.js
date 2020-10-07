import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import equals from 'validator/lib/equals';
import {showErrorMsg, showSuccessMsg} from '../helpers/messages';
import {showLoading} from '../helpers/loading';
import {signUp} from '../api/auth';
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
            [e.target.name]: e.target.value,
            successMsg:'',
            errorMsg:''
        })
    }

    const handleSubmit = e =>{
        e.preventDefault();
        //client side validation
        if(isEmpty(userName) || isEmpty(email) || isEmpty(password) || isEmpty(password2)){
            setData({
                ...data,
                errorMsg:'All Fields are required..'
            })
        } else if(!isEmail(email)){
            setData({
                ...data,
                errorMsg:'Invalid Email'
            })
        } else if(!equals(password,password2)){
            setData({
                ...data,
                errorMsg:'Passwords do not match'
            })
        } else {
            // success
            const {userName,email,password} = data;
            const formData = {userName,email,password}
            setData({
                ...data,
                loading:true
            })

            signUp(formData)
            .then(response =>{
                console.log(response);
                setData({
                    userName:'',
                    email:'',
                    password:'',
                    password2:'',
                    loading:false,
                    successMsg: response.data.successMsg
                })
            })
            .catch(err =>{
                console.log('Axios signup Error:', err);
                setData({
                    ...data,
                    loading:false,
                    errorMsg: err.response.data.errorMessage
                })
            })
        }
    }

    return (
        <div className="img-container">
            <div className="row px-2 vh-100">
                <div className="col-md-5 mx-auto align-self-center">
                    {successMsg && showSuccessMsg(successMsg)} 
                    {errorMsg && showErrorMsg(errorMsg)}
                    {loading && (<div className="text-center pb-4">{showLoading()}</div>)}
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
            {JSON.stringify(data)}
        </div>
       
    )
}

export default SignUp
