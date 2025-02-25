import NotFound from './NotFound';

const ErrorView = ({ error }) => {
    
    if (error.message.includes("Network Error"))
        return (
            <div>
                <h2 className="text-danger">Network Error</h2>
                <button className="btn btn-primary">Retry</button>
            </div>)
    if (error.response?.status === 404)
        return <NotFound />
    else
        return (
            <div>
                <h2 className="text-danger">An error occurred</h2>
                <p>{error.message}</p>
            </div>
        )
}


export default ErrorView;