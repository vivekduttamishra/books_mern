import { useState } from "react";


const UserLoginScreen = () => {
    
    let email = ""
    let password = "";
    let [error,setError] = useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!email)
            setError('Email is required');
        else if(!password)
            setError('Password is required');
        else{
         //   console.log('Logging', email,password);
            setError(null);
        }
    }

    const handleEmailChange=(e)=>{
        //console.log('email change',e.target.value);
        email = e.target.value;
    }

    const handlePasswordChange=(e)=>{
        //console.log('password change',e.target.value);
        password = e.target.value;
    }


    return (
        <div className="user-login-screen">
            <h3 className='text-danger'>{error}</h3>
            <form onSubmit={handleSubmit}>  
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input onChange={handleEmailChange} type="text" className="form-control"   id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input onChange={handlePasswordChange} type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
               
                <button type="submit"   className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default UserLoginScreen;