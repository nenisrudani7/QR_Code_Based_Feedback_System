import React, { useState } from "react";
import { useEffect } from "react";
import { districts, newData } from "../constants/districts";

const SelectStation = ({ onNext, onSelectStation, selectedStation }) => {
  const [district, setDistrict] = useState("");
  const [taluka, setTaluka] = useState("");
  const [station, setStation] = useState("");

  useEffect(() => {
    if (selectedStation) {
      const { district, police, taluka } = selectedStation;
      district && setDistrict(district);
      taluka && setTaluka(taluka);
      police && setStation(police);
    }
  }, [selectedStation]);

  // Handlers Methods
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!district || !taluka) {
      return alert("required...");
    }
    onSelectStation({
      district: district,
      taluka: taluka,
      police: station,
    });
    onNext();
  };

  return (
    <div className="data_container">
      <div className="data_container_wrap">
        <div className="heading_auth">
          <h2>Select Your Police Station</h2>
          <hr />
          <p>Kindly select your police station.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="district">
            <select
              className="district__1"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              disabled={selectedStation}
            >
              <option value="">Select District</option>
              {newData.map((dist) => (
                <option value={dist.name} className="option__forform">
                  {dist.name}
                </option>
              ))}
            </select>
          </div>
          {district && (
            <div className="district__taluko">
              <select
                className="district__taluko1"
                onChange={(e) => setTaluka(e.target.value)}
                disabled={selectedStation}
              >
                <option value="">Select Taluka</option>
                {newData
                  ?.find((obj) => obj?.name === district)
                  ?.taluka?.map((taluko) => (
                    <option value={taluko.name} className="option__forform">
                      {taluko.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
          {district && taluka && (
            <div className="district__police">
              <select
                className="district__police1"
                onChange={({ target }) => setStation(target.value)}
                disabled={selectedStation}
              >
                <option value="">Select Station</option>x
                {newData
                  ?.find((obj) => obj?.name === district)
                  ?.taluka?.find((obj) => obj?.name === taluka)
                  ?.police_stations?.map((police) => (
                    <option value={police} className="option__forform">
                      {police}
                    </option>
                  ))}
              </select>
            </div>
          )}
          <button className="sendOtp" disabled={!station}>
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default SelectStation;
