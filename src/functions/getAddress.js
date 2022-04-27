import notification from "../components/Alerts";

const stateObj = {
    "AK" : "Alaska",
    "AL" : "Alabama",
    "AR" : "Arkansas",
    "AS" : "American Samoa",
    "AZ" : "Arizona",
    "CA" : "California",
    "CO" : "Colorado",
    "CT" : "Connecticut",
    "DC" : "District of Columbia",
    "DE" : "Delaware",
    "FL" : "Florida",
    "GA" : "Georgia",
    "GU" : "Guam",
    "HI" : "Hawaii",
    "IA" : "Iowa",
    "ID" : "Idaho",
    "IL" : "Illinois",
    "IN" : "Indiana",
    "KS" : "Kansas",
    "KY" : "Kentucky",
    "LA" : "Louisiana",
    "MA" : "Massachusetts",
    "MD" : "Maryland",
    "ME" : "Maine",
    "MI" : "Michigan",
    "MN" : "Minnesota",
    "MO" : "Missouri",
    "MS" : "Mississippi",
    "MT" : "Montana",
    "NC" : "North Carolina",
    "ND" : " North Dakota",
    "NE" : "Nebraska",
    "NH" : "New Hampshire",
    "NJ" : "New Jersey",
    "NM" : "New Mexico",
    "NV" : "Nevada",
    "NY" : "New York",
    "OH" : "Ohio",
    "OK" : "Oklahoma",
    "OR" : "Oregon",
    "PA" : "Pennsylvania",
    "PR" : "Puerto Rico",
    "RI" : "Rhode Island",
    "SC" : "South Carolina",
    "SD" : "South Dakota",
    "TN" : "Tennessee",
    "TX" : "Texas",
    "UT" : "Utah",
    "VA" : "Virginia",
    "VI" : "Virgin Islands",
    "VT" : "Vermont",
    "WA" : "Washington",
    "WI" : "Wisconsin",
    "WV" : "West Virginia",
    "WY" : "Wyoming"
}

const key = process.env.REACT_APP_MAPQUEST_SECRET_KEY;

function populateFields(location) {
    const street_address = document.getElementById("street_address");
    const city = document.getElementById("city");
    const state = document.getElementById("state");
    const zip_code = document.getElementById("zip_code");

    street_address.value = location.street_address;
    city.value = location.city;
    state.value = location.state;
    zip_code.value = location.zip_code.slice(0, 5);
}

export const currentLocation = async () => {
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    const success = async (pos) => {
        const crd = pos.coords;
        const result = await fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=${key}&location=${crd.latitude},${crd.longitude}`);
        const data = await result.json();
        console.log(data)
        if (data.info.statuscode !== 0) {
            notification(
                {
                    'status': 'error',
                    'message': "There was an issue with the location, please try again."
                }
            );
            return
        }
        return populateFields({
            street_address: data.results[0].locations[0].street,
            city: data.results[0].locations[0].adminArea4,
            state: stateObj[data.results[0].locations[0].adminArea3],
            zip_code: data.results[0].locations[0].postalCode
        })
    };

    const error = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        alert("There was an issue with the location, please try again.");
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
};


