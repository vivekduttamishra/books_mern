

const NotFound = ({ message="Not Found", image='/404-01.gif', width=400})=>{
    return (
        <div className="not-found">
            <h2>{message}</h2>
            <img src={image} alt="Not Found" width={width} />
        </div>
    )
}

export default NotFound;