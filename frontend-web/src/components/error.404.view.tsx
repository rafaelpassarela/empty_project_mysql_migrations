import * as React from 'react';
import { Link } from 'react-router-dom';

function Error404(props: { location: { pathname: React.ReactNode; }; }) {
    console.log(props);
    return (
        <div className="center-block">
            <h1>Error 404</h1>
            <img src="/img/404.png" alt="404 Error" /> <br /><br />
            <h2>The page "{props.location.pathname}" doesn't exist!</h2> 
            <h3>Would you like to return <Link to="/">home</Link> instead?</h3>
        </div>
    );
}

export default Error404;