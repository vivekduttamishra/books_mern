import { DropDown, Editor, LabeledInput, useModel } from "../../utils/components/Input";
import TitledComponent, { withTitleExpander } from "../../utils/components/TitledComponent";
import { oneOf, match, email, minLength, required, strongPassword, range } from "../../utils/validator";

const userSchema = {
    name: { value: "", validators: [required] },
    email: [required, email], //default ""
    password: { value: "", validators: [required, strongPassword, minLength(8)], inputType: "password" },
    confirmPassword: { value: "", label: "confirm password", validators: [required, strongPassword, minLength(8), match('password')], inputType: "password" },
    photo: "", //no validation required.
    roles: {
        value: "",
        label: "Applied Role",
        validators: [oneOf("author", "editor", "reader")],
        component: (id, model, onChange) => <DropDown values={["author", "editor", "reader"]}
            onChange={onChange}
            value={model[id]}
            id={id}
        />

    },
    // rank: {value:'', validators:[range(1,10)]}

}

const UserRegistrationScreen = () => {

    //const [user,onChange,errors]=useModel(userSchema);

    const registerUser = async (user, errors) => {
        console.log('user', user);
        console.log('errors', errors);
        //make API call to register user
    }

    return (
            <div className="user-registration-screen">


                <Editor
                    schema={userSchema}
                    onSubmit={registerUser}
                    submitLabel="Sign Up"
                    submitWithErrors
                />

            </div>
    )
}

export default withTitleExpander( UserRegistrationScreen) ;