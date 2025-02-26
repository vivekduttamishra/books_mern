
const Loading = ({condition=true,image='/loading01.gif', size=100})=>{

    const _style={
        width: size,        
    }

    if(!condition){
        return null;
    } else{
        return <img src={image} style={_style} alt="loading"/>
    }




}

export default Loading;