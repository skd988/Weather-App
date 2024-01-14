import {useState} from "react";
import Location from "../Location"

/**
 * Locations component:
 runs on "/locations", provides the user with a form to add locations to the list,
 each location consists of name, longitude and latitude.
 Also displays the list of locations, and allows the user to remove any location by clicking on "x".

 * @param props receives locations list, adding location function and remove location function
 * @returns {JSX.Element} locations form component
 */
export default function Locations(props) {
    //states of the form's input boxes values
    const [name, setName] = useState('')
    const [lat, setLat] = useState()
    const [lon, setLon] = useState()

    //errors of the form, informs the user of the problems after a submission of a location fails
    const [nameError, setNameError] = useState('');
    const [latError, setLatError] = useState('');
    const [lonError, setLonError] = useState('');

    /**
     * prints the list of locations, each with removing option
     * @returns {JSX.Element} locations list, allows the user to remove
     */
    function printLocations() {
        if (props.locations.length === 0)
            return (
                <div><p><small>Your Locations list is empty. </small></p></div>
            );

        return (
            <ul className="list-group">
                {props.locations.map(location =>
                    <li id={location.name} key={location.name} className="list-group-item d-flex d-inline">
                        <button type="button" className="btn-close" onClick={handleRemoveButtonClick}/>
                        <p>&nbsp;Name: {location.name}, Latitude: {location.lat}, Longitude: {location.lon}</p>
                    </li>
                )}
            </ul>
        );
    }

    /**
     * call the app remove function on the location that was clicked
     * @param event of the click on the remove button of the specific location
     */
    function handleRemoveButtonClick(event) {
        props.removeLocation(event.target.parentElement.id)
    }

    /**
     * update the name state to the current value in the form's name input box
     * @param event of the change in the name input box
     */
    function handleNameChange(event) {
        setName(event.target.value.trim())
    }

    /**
     * update the lat state to the current value in the form's lat input box (if it's a number)
     * @param event of the change in the lat input box
     */
    function handleLatChange(event) {
        setLat(!isNaN(event.target.value) ? parseFloat(event.target.value) : NaN)
    }

    /**
     * update the lon state to the current value in the form's lon input box (if it's a number)
     * @param event of the change in the lon input box
     */
    function handleLonChange(event) {
        setLon(!isNaN(event.target.value) ? parseFloat(event.target.value) : NaN)
    }

    /**
     * adds a new input location according to the information in the form.
     * if submission fails, updates the error messages accordingly
     * @param event of the submission of the form
     */
    function handleSubmitLocation(event) {
        event.preventDefault();
        const validationChecks = props.addLocation(new Location(name, lat, lon));
        setNameError(validationChecks[0]);
        setLatError(validationChecks[1]);
        setLonError(validationChecks[2]);
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="col-lg-5 col-md-8">
                <br/>
                <h2> Add a new location: </h2>
                <form onSubmit={handleSubmitLocation}>
                    <br/>
                    <label htmlFor="name">Name:</label>
                    <br/>
                    <input id="name" type="text" className="col-12" onChange={handleNameChange}/>
                    {' '}
                    <small className="text-danger">{nameError}</small>
                    <br/>
                    <br/>
                    <label htmlFor="lat">Latitude:</label>
                    <br/>
                    <input id="lat" type="text" className="col-12" onChange={handleLatChange}/>
                    {' '}
                    <small className="text-danger">{latError}</small>
                    <br/>
                    <br/>
                    <label htmlFor="lon">Longitude:</label>
                    <br/>
                    <input id="lon" type="text" className="col-12" onChange={handleLonChange}/>
                    {' '}
                    <small className="text-danger">{lonError}</small>
                    <br/>
                    <br/>
                    <button type="submit" className="btn btn-primary">Save Location</button>
                </form>
                <br/>
                <h3>Locations:</h3>
                {printLocations()}
            </div>
        </div>
    );
}
