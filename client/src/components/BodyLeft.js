import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TYPES } from "../redux/actions/apiAction";
import email from "../images/email.png";
import axios from "axios";
import HistoryModal from "./HistoryModal";
import EmailModal from "./EmailModal";

const BodyLeft = () => {
  const { alert } = useSelector((state) => state);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [city, setCity] = useState("");
  const [history, setHistory] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const dispatch = useDispatch();
  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const API_endpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  const API_key = "70fd5b0c07844564ce3d8854527311e4";

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    
  }, [latitude, longitude]);

  //Get Location
  const handleGetCurrentLocation = () => {
    let final_APIEndPoint =`${API_endpoint}lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${API_key}`
    axios.get(final_APIEndPoint)
    .then((res) => {
        setCity(res.data.name)
    })
    .catch((err) => {
        console.log(err)
    })
  };

  // Handle Search
  const handleSearch = () => {
    dispatch({ type: TYPES.CHANGE_CITY, payload: city });
    dispatch({ type: TYPES.CHANGE_FORECAST, payload: 4 });
  };

  return (
    <div className="BodyLeft">
      <div className="search_form">
        <h4>Enter a City Name</h4>
        <input
          type="text"
          id="cityname"
          name="cityname"
          value={city}
          placeholder="Eg., NewYork, London, Tokyo"
          onChange={handleCity}
        />
        {alert.alert && (
          <div className="mx-2" style={{ color: "red", fontWeight: "400" }}>
            {alert.message}
          </div>
        )}
        <buton className="btn btn-primary mt-2" onClick={handleSearch}>
          Search
        </buton>
      </div>
      <div className="separator">
        <h4>or</h4>
      </div>
      <buton
        className="w-100 btn btn-secondary"
        onClick={handleGetCurrentLocation}
      >
        Use Current Location
      </buton>

      <div
        className="receive_mail btn btn-warning"
        style={{ fontWeight: "500" }}
        onClick={() => setHistory(true)}
      >
        Search history
      </div>

      <div className="receive_mail btn btn-success" onClick={() => setEmailModal(!emailModal)}>
        <img src={email} style={{ width: "30px", height: "30px" }} />
        <h4>Daily weather alerts</h4>
      </div>
      {emailModal && <EmailModal/>}
      {history &&  <HistoryModal setHistory={setHistory}/>}
    </div>
  );
};

export default BodyLeft;
