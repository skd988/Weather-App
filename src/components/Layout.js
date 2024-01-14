import {Link} from 'react-router-dom';
import {Outlet} from "react-router";


/**
 * Layout component:
 * the layout of the website, contains the title,
 * two buttons to route you to either the locations form or the forecast service,
 * and the outlet component that is updated according to the route.

 * @param props empty
 * @returns {JSX.Element} layout form component
 */
export default function Layout(props) {
    return(
        <div>
            <div className="d-flex bg-primary justify-content-center">
                <h1 className="text-dark text-center">Weather App</h1>
            </div>
            <br/>
            <div className="container d-flex justify-content-center">
                <div className="col-md-3 d-flex justify-content-center">
                    <Link to="/forecast"><button className="btn btn-success"><b>Forecast</b></button></Link>
                </div>
                <div className="col-3 col-md-1"/>
                <div className="col-md-3 d-flex justify-content-center">
                    <Link to="/locations"><button className="btn btn-success"><b>Locations</b></button></Link>
                </div>
            </div>
            <Outlet/>
        </div>
    );
}