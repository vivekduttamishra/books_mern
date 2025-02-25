import { useState } from "react";
import { withTitleExpander } from "../../utils/components/TitledComponent";


const UserLoginScreen = () => {
    
    let [user,setUser] = useState({email:'',password:''});
    let [error, setError] = useState('');

    const handleInputChange=(e)=>{

        let id = e.target.id;
        let value = e.target.value;

        let userState= {
            ...user,
            [id]:value
        }

        setUser(u=>userState);

    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        //call login api here
        //console.log('logging the ', user);
    }
    

    return (
        <div className="user-login-screen">
            <h3 className='text-danger'>{error}</h3>
            <form onSubmit={handleSubmit}>  
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input id="email" value={user.email} onChange={handleInputChange} type="text" className="form-control"    aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input id="password" value={user.password} onChange={handleInputChange} type="password" className="form-control" />
                </div> 
               
                <button type="submit"   className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default withTitleExpander( UserLoginScreen,"User Login");