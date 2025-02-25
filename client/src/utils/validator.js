
const compulsory = (value)=>{
    if(value)
        return undefined;
    else
        return {error:`value is compulsory`,value}
}


const _assertValid = (condition, value, message)=>{
    if(!condition){
        return {error:message, value, message:`${message} : ${value}`}
    }
}





export const required =  (value)=> _assertValid( value && value.toString().trim(), value, "Required")


export const singleDigit = (value) => _assertValid( parseInt(value)>=0 && parseInt(value)<=0, value, 'Should be single digit number')

export const range= (min,max)=> value => _assertValid( value>=min && value<=max, value, `Should be between ${min} and ${max}`)



export const email = (value)=> _assertValid(value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), value, "Invalid email address")

export const minLength = (minLength)=> (value)=> _assertValid(value && value.length >= minLength, value, `Minimum Length should be ${minLength}`)

export const maxLength = (maxLength)=> (value)=> _assertValid(value && value.length <= maxLength, value, `Maximum Length should be ${maxLength}`)

export const match = (refValue)=> (value,model)=> _assertValid(value === model[refValue], value, `Doesn't match: ${refValue}`)

export const oneOf = (...values)=> (value) => _assertValid(values.includes(value), value,`Not in Range ${values}`)

export const or = (...validators)=> (value) => {
 
    let errors = validators.map(validator => _assertValid(validator)).filter(result=>result);
    if(errors.length === validators.length) //if all validations failed
        return {message:"MULTI", value, errors}     
}

export const min = (min)=> (value)=> _assertValid(value>=min, value,`Value should be at least ${min}`)

export const max = (max)=> (value)=> _assertValid(value<=max, value,`Value should be at most ${max}`)

export const number = (value)=> _assertValid(typeof value === 'number', value,`Should be a number`)

export const positive = (value)=> _assertValid(value>0, value,`Should be a positive number`)

export const negative = (value)=> _assertValid(value<0, value,`Should be a negative number`)

export const alphanumeric = (value)=> _assertValid(/^[a-zA-Z0-9]+$/.test(value), value,`Should be alphanumeric`)

//strong password validation 
//must have at least one upper case one lower case, one digit and one special case character

export const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const strongPassword = (value)=> _assertValid(strongPasswordRegex.test(value), value, `Password should have at lease 1 upper case one lower case one digit and one special character`)

export const optional= (value)=> null;


//a schema hook

//import { useState } from 'react'



export const validateKey=(model, schema, key)=>{
    
    if (!key)
        return ; //ignore

    if(!schema[key])
        return ; //nothing to validate.
        
    let {validators} = schema[key]; 
    if(typeof(validators)==='function')
        validators = [validators]

    const value = model[key];

    for(let validator of validators){
        let error=validator(value,model);
        if(error)
            return error;
    }

    //no error.

}

export const validate = (model, schema)=>{
    let errors={};
    let errorCount=0;
    for(let key in schema){
        let error=validateKey(model, schema, key);
        if(error){
            errors[key]=error;
            errorCount++;
        }
    }

    if(errorCount)
        return errors
    else
        return null;
}



export const updateSchema = (schema) => {

    for (let field in schema) {
        let v = schema[field];
        if (typeof (v) === 'function') {
            v = { value: "", validators: [v], label: field }
        } else if (v instanceof Array) {
            v = { value: '', label: field, validators: v }
        } else if (v instanceof Object && v.validators) {
            v = { value: '', label: field, ...v }
        } else {
            v = { value: v, label: field, validators: [] }
        }
        // if (!v.component)
        //     v.component = (id, model, onChange) => <input type="text" id={id} name={id} value={model[id]} onChange={onChange} />
        schema[field] = v
    }

    return schema;
}


export const createSchemaObject = schema =>{
        
    let _model = {};
    Object.keys(schema).forEach(key => {
        _model[key] = schema[key].value;
    })

    return _model;

}



