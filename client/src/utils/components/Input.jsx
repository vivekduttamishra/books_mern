import { useState } from 'react';
import { createSchemaObject, updateSchema, validate } from '../validator';

/* sample schema

 let userSchema={
 
    name: {value:'', label:'User Name', validators:[required]},

    email:  email,

    password: [required,strongPassword,minLength(8)],

    status: "",

    roles: oneOf('admin','employee','handler')
   
 }

 userSchema=updateSchema(userSchema);

 console.log('userSchema',userSchema);
 


*/

const _updateSchemaForReact= schema=>{
    schema = updateSchema(schema);
    Object.keys(schema).forEach(key => {        
       
        let inputType =schema[key].inputType || "text";

        if (!schema[key].component)
            schema[key].component = (id, model, onChange) => <input type={inputType} className="form-control"
                id={id} value={model[id]} name={id}
                onChange={onChange} />
    })

    return schema;
}

export const useModel = (schema) => {

    schema = _updateSchemaForReact(schema);

    const _model = createSchemaObject(schema);


    const [model, setModel] = useState(_model);
    const [errors, setErrors] = useState(null); //no error by default

    const onChange = (e) => {
        let newModel = { ...model };
        newModel[e.target.name] = e.target.value;
        setModel(newModel);
        let _errors= validate(newModel,schema);
       // console.log('errors',_errors)
        setErrors(_errors);
    }

    return [model, onChange, errors]
}

export const DropDown=({values,value,id,onChange})=>{
    return (
        <select className="form-select" id={id} value={value} name={id} onChange={onChange} placeholder={`Select ${id}`}>
            {value || <option value="">Select {id}</option>}
            {values.map(value => <option key={value} value={value}>{value}</option>)}
        </select>
    )
}



export const LabeledInput = ({ model, id, errors, onChange, label = id }) => {

    return (
        <div className="mb-3">
            <label htmlFor={id}>{label}</label>
            <input type="text"
                className="form-control"
                id={id}
                value={model[id]}
                name={id}
                onChange={onChange} />
            {errors && errors[id] && <div className="text-danger">{errors[id].error}</div>}
        </div>
    )
}

export const Editor = ({ schema, onSubmit, submitWithErrors = false, submitLabel="Submit" }) => {

    const [model, onChange, errors] = useModel(schema);

    const handleSubmit = (e) => {
        //e.preventDefault();
        if (errors && !submitWithErrors) {
            return
        }
        onSubmit(model, errors);
    }

    return (
        <form >
            {
                Object.keys(schema).map(key => {

                    const {label,component}=schema[key];                   
                    //console.log('component',component);
                    // if(errors)
                    //     console.log(`errors[${key}]`, errors[key]);

                    let errorCss= errors && errors[key]?"validation-error":"validation-success";

                    return (
                        <div className={"mb-3 "+errorCss} key={key}>
                            <label htmlFor={key}>{label}</label>
                            {component(key,model,onChange)}
                            {errors && errors[key] && <div className="text-danger">{errors[key].error}</div>}
                        </div>
                    )

                })
            }
            <button type="button" disabled={errors && !submitWithErrors} onClick={handleSubmit} className="btn btn-primary">{submitLabel}</button>
        </form>


    )
}