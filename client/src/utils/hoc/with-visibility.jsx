

export const withVisibility=( Target, defaultVisiblity=true )=>{

    return (props)=>{

        let visibility = props.visibility===undefined?defaultVisiblity:props.visibility

        if(visibility)
            return <Target {...props}/>
        else
            return null;


    }



}