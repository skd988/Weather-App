import Layout from "./components/Layout";
import Forecast from "./components/Forecast";
import NotFound from "./components/NotFound";
import Locations from "./components/Locations";
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState} from "react";

/**
    the main app, contains the list  of locations (state) added by the user,
    functions to add or remove locations from the list,
    and the router which contains the components of the website.
 */
export default function App() {
    //error to display if the new location's name is already exists
    const DUP_NAME_ERROR = "Name is already in use";

    //list of locations (state), added by the user
    const [locations, setLocations] = useState([]);

    /** checks if the new name already exists at the list */
    function doesNameExists(name){
        if(locations.find(loc => loc.name === name))
            return DUP_NAME_ERROR;

        return '';
    }

    /** adding a new location to the list, if it's valid and the name hasn't been added */
    function addLocation(location){
        const validationChecks = [location.isNameValid(), location.isLatValid(), location.isLonValid()]
        if(validationChecks[0] === '')
            validationChecks[0] = doesNameExists(location.name);

        if(validationChecks.every(msg => msg === ''))
            setLocations(prevLocs => [...prevLocs, location])

        return validationChecks;
    }

    /** removing location from list by name (for x button) */
    function removeLocation(name){
        setLocations(prevLocs => {
            const index = prevLocs.findIndex(loc => loc.name === name);
            if(index !== -1)
                prevLocs.splice(index, 1);

            return [...prevLocs];
        });
    }

    /** the router of the website, consists of the layout and two routes of the locations form and the forecast */
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="forecast" element={<Forecast locations={locations}/>}/>

            <Route path="locations" element={<Locations locations={locations}
                                                        addLocation={addLocation} removeLocation={removeLocation}/>}/>
            <Route path={"*"} element={<NotFound/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}