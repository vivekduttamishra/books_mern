

const  withBorder=(TargetComponent,title="")=>{
    
    const _style={
        border:'3px solid black'
    }


    return (props)=>{

        return(
            <div style={_style}>
                <h2>{title}</h2>
                <TargetComponent{...props} />
            </div>
        )
    }
}

export default withBorder;