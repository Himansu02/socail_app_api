import { useRouteError } from "react-router-dom"

const Error=()=>{
    const error = useRouteError();
    <div className="centered focused">
        <p>An Error Occured!</p>
        <p>{error.message}</p>
    </div>

}

export default Error;