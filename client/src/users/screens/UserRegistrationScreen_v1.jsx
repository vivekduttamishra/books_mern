import { DropDown, Editor, LabeledInput, useModel } from "../../utils/components/Input";
import { oneOf, match, email, minLength, required, strongPassword } from "../../utils/validator";


const UserRegistrationScreen=()=>{
    const userSchema ={
        name: required,
        email:[required,email],
        password:{validators:[required, minLength(8),strongPassword], inputType:"password"},
        confirmPassword:{ value:"", label:"confirm password",inputType:"password", validators:[required, match('password'),strongPassword]},
        photo:"",
        roles:{validators:[required, oneOf("reader","author","editor")], 
                component:(id,model,onChange)=><DropDown values={['author','editor','reader']} 
                                                        value={model[id]} id={id} onChange={onChange} name={id} /> }
    }

    const registerUser=(user,error)=>{
        console.log('user',user);
        console.log('error',error);
    }


    return (
        <div className="user-registration-screen">
            <h1>User Registration</h1>
            <Editor schema={userSchema} onSubmit={registerUser} />
             

        </div>
    )
}

export default UserRegistrationScreen;