import {useState} from "react";
import "./Forecast.css"

/**     Forecast component:
 * allows the user to choose a location added in the locations form,
 * and get the weather forecast for that location.
 @param props contains the basic list of location
 @returns the html for the locations list you can choose out from, and the results of the search
 */
export default function Forecast(props) {
    //the locations chosen from the list of locations
    const [chosenLocation, setChosenLocation] = useState();
    //the url of the forecast's image
    const [imgUrl, setImgUrl] = useState('')
    //the current weather data in the chosen location
    const [currWeather, setCurrentWeather] = useState({})
    //error message, if the fetch failed or no location has been chosen
    const [errMsg, setErrorMsg] = useState('')
    //is the fetch in progress
    const [isLoading, setIsLoading] = useState(false)

    /**
     * setting the img url according to chosen location
     */
    function setImg() {
        if (!chosenLocation)
            return;

        const newImgUrl = "https://www.7timer.info/bin/civillight.php" +
            "?%20lon=" + chosenLocation.lon + "&lat=" + chosenLocation.lat +
            "&ac=0&lang=en&unit=metric&output=internal&tzshift=0";

        setImgUrl(newImgUrl);
    }


    /**
     *  status check for a response. if response is 2xx it is accepted, otherwise rejected (returns text and status object)
     * @param response for status check
     * @returns fetch promise, resolved or rejected
     **/    
    const status = (response) => {
        return (response.status >= 200 && response.status < 300) ?
            Promise.resolve(response) : Promise.reject({statusText: response.statusText, status: response.status});
    };


    /**
     * making a get request to the server to get weather data for chosen location
     */
    function getTheWeather() {
        if (!chosenLocation) {  //if empty
            setErrorMsg("must select a location from the list");
            return;
        }
        setCurrentWeather({});
        setIsLoading(true);
        setErrorMsg('');

        setImg();

        const weatherUrl = "https://www.7timer.info/bin/api.pl" +
            "?lon=" + chosenLocation.lon + "&lat=" + chosenLocation.lat + "&product=civillight&output=json";

        fetch(weatherUrl)
            .then(status)
            .then(res => res.json())
            .then(data => {
                const tmpNewWeather = {
                    weather: data?.dataseries[0]?.weather, maxTemp: data?.dataseries[0]?.temp2m.max,
                    minTemp: data?.dataseries[0]?.temp2m.min, wind: data?.dataseries[0]?.wind10m_max,
                    date: parseDateYYYYMMDD(data?.dataseries[0]?.date)
                };
                if (tmpNewWeather.wind === 1)
                    tmpNewWeather.wind = "No wind"

                setCurrentWeather(tmpNewWeather)
            })
            .catch(e => {
                setErrorMsg("Weather forecast service is not available right now, please try again later. ")
            }).finally(() => setIsLoading(false));

    }

    /**
     * prints the weather data
     */
    function printWeather() {
        if (!currWeather.weather) {
            return;
        }
        return (
            <div className={!currWeather? "d-none" : ""}>
                <img className="img-fluid" src={imgUrl} alt="nice weatherpic"/><br/>

                <div className="card col-xl-6">
                    <div className="card-header"><b>Weather for:</b> {getDate()}</div>
                    <div className="card-body">
                        <b>The weather today:</b> {currWeather?.weather}<br/>
                        <b>Temprature: </b>Between {currWeather?.minTemp}°C to {currWeather?.maxTemp}°C<br/>
                        <b>Wind conditions: </b> {currWeather?.wind} <br/>
                    </div>
                </div>
                <br/>
            </div>
        );
    }

    /**
     * prints the locations list, with an option to click and choose
     * @returns html for locations list to choose out from (for the search)
     */
    function printLocations() {
        if (props.locations.length === 0)
            return (
                <div><p><small>You Locations list is empty. <br/>
                    please head to Locations section and add some.</small></p></div>
            );

        return (<ul className="list-group card">
                {props.locations.map(location =>
                    <li id={location.name} key={location.name}
                        className={" list-group-item list-group-item-action d-flex"
                        + (location.name === chosenLocation?.name ? " active" : "")}
                        onClick={chooseLocation}>
                        <p>Name: {location.name}, Latitude: {location.lat}, Longitude: {location.lon}</p>
                    </li>
                )}
            </ul>
        );
    }

    /**
     * returns the chosen name from the event of the click
     * @param event of the click
     * @returns the chosen name from the event of the click
     */
    function getChosenLocationName(event){
        if(event.target.tagName === 'P')
            return event.target.parentElement.id;

        return event.target.id;
    }

    /** updates the location state according to the location that was clicked from the list */
    function chooseLocation(event) {
        setErrorMsg('');
        setChosenLocation(props.locations.find(loc => loc.name === getChosenLocationName(event)));
    }

    /**
     * parse the date in YYYYMMDD format into a js date object
     * @param date in format of YYYYMMDD
     * @returns date object of the received date
     */
    function parseDateYYYYMMDD(date) {
        date = date.toString();
        date = date.slice(0, 4) + "-" + date.slice(4, 6) + "-" + date.slice(6);
        return new Date(date);
    }

    /**
     * get the current date from the weather data
     * @returns {string | undefined} the date in string
     */
    function getDate() {
        return currWeather?.date?.toDateString();
    }

    /**
     * showing an error message line
     * @return the html of the error line
     */
    function showErrorMsg() {
        if (errMsg === '')
            return;
        return (
            <div className="alert alert-danger" role="alert">{errMsg}</div>
        );
    }

    /**
     * print the spinner. only happens when loading is on
     * @returns the spinner html dive
     */
    function printSpinner() {
        return (<div className="loader"/>)
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="col-lg-5 col-md-8">
                <br/>
                {isLoading && printSpinner()}
                <br/>
                {showErrorMsg()}
                {printWeather()}
                <button onClick={getTheWeather} className="col-md-4 btn btn-primary">Get Weather Please</button>
                <br/><br/>
                <h3>Locations</h3>
                {printLocations()}
            </div>
        </div>
    );
}