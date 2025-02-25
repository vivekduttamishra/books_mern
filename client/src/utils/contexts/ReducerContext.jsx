import { createContext, useReducer, useContext } from "react";
import { useStatusContext } from "../../commons/contexts/status-context";


/*
async function getAuthorById(id) {
    try {
        setStatus('AUTHOR_SELECT', 'executing')
        let result = await service.getAuthorById(id);
        setStatus('AUTHOR_SELECT', 'success', result)
        dispatch('AUTHOR_SELECT', result);
    } catch (err) {
        setStatus('AUTHOR_SELECT', 'error', err)
        dispatch('AUTHOR_SELECT', null);
    }
}
*/


export const asyncAction = (action, fn, dispatch,setStatus) => {
    async function _fn(...params) {
        try {
            setStatus(action, 'executing')
            let result = await fn(...params);
            setStatus(action, 'success', result)
            dispatch(action, result);
        } catch (err) {
            setStatus(action, 'error', err)
            dispatch(action, null);
        }
    }

    _fn.name = fn.name || action;
    return fn;
}





export const actionReducer = (actionsHandlers) => (state, action) => {

    if (actionHandlers[action.type]) {
        let result = actionHandlers[action.type](state, action.payload, action);
        if (result !== undefined)
            return { ...state, ...result };
    }
    return state;
}

/*
const authorActions={
    authors: (store,authors)=> ({authors}),
    selectedAuthor:(store,author)=>({selectedAuthor:author}),
    removeAuthor:(store,id)=>{
        let authors= store.authors.filter(a=>a.id!==id)
        let selectedAuthor = store.selectedAuthor.id===id?null:selectedAuthor
        return {authors,selectedAuthor}
    },
    clear:()=>({authors:[],selectedAuthor:null})
}
*/



const  createContextProvider = (reducer, options) => {
    const context = createContext();
    options={
                actionCreators:{}, 
                initialValue : null, 
                storeName : 'store',
                contextName:"Context",               
                ...options
            }

    const { actionCreators, initialValue, storeName,contextName } = options;

    const ContextProvider = ({ children }) => {

        const [store, dispatch] = useReducer(reducer,initialValue)
        const controller={};
        controller[storeName]=store;
        const {setStatus} = useStatusContext();

        for(let action in actionCreators){
            let info = actionCreators[action];
            if(typeof(info) === "function")
                info={actionType: action, action:info}
            //else
            //we expect info to have keys actionType and action.


            controller[action]=asyncAction(info.actionType,info.action,dispatch,setStatus);
        }


        return (
            <context.Provider values={controller} >
                {children}
            </context.Provider>
        );
    }


    return {
        [`${contextName}Provider`]: ContextProvider,
        [`use${contextName}Provider`]: () => useContext(context),
    }

}

export default createContextProvider;

