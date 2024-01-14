//values that define the range of latitude and longitude
const MAX_LAT = 90;
const MIN_LAT = -90;
const MAX_LON = 180;
const MIN_LON = -180;

//error message for empty name
const EMPTY_ERROR = "Name cannot be empty";

//error message for a value that is not a number
const NAN_ERROR = "Must enter a number";

//error messages for longitude or latitude that aren't in range
const LAT_RANGE_ERROR = "Latitude must be between " + MIN_LAT + " and " + MAX_LAT;
const LON_RANGE_ERROR = "Longitude must be between " + MIN_LON + " and " + MAX_LON;

/**
 *     class Location:
 *     class to pack together location data,
 *     contains name, latitude and longitude.
 *     also provides function to check if values are valid.
 */
class Location{
    /**
     * Gets name, lat and lon, sets object's values accordingly. does not validate (validation needs to be called for)
     * @param name of the location
     * @param lat (latitude) of the location
     * @param lon (longitude) of the location
     * @constructor
     */
    constructor(name, lat, lon) {
        this.name = name;
        this.lat = lat;
        this.lon = lon;
    }

    /**
     * returns an error message if the name is not valid - if it's empty. '' if name is valid
     * @returns {string} error message of '' if name is valid
     */
    isNameValid(){
        if(this.name === '')
            return EMPTY_ERROR;

        return '';
    }

    /**
     * returns an error message if the lat is not valid - if it's NaN or not in range. '' if lat is valid
     * @returns {string} error message of '' if lat is valid
     */
    isLatValid(){
        if(isNaN(this.lat))
            return NAN_ERROR;

        if(this.lat < MIN_LAT || this.lat > MAX_LAT)
            return LAT_RANGE_ERROR;

        return '';
    }

    /**
     * returns an error message if the lon is not valid - if it's NaN or not in range. '' if lon is valid
     * @returns {string} error message of '' if lon is valid
     */
    isLonValid(){
        if(isNaN(this.lon))
            return NAN_ERROR;

        if(this.lon < MIN_LON || this.lon > MAX_LON)
            return LON_RANGE_ERROR;

        return '';
    }
}

export default Location;