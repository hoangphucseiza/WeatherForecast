import React, { useEffect, useState } from "react";
import axios from "axios";
import HistoryCard from "./HistoryCard";
import { apiURL } from "../utils/apiURL";

const HistoryModal = ({ setHistory }) => {
  const [historyData, setHistoryData] = useState(null);
  useEffect(() => {
    axios
      .get(`${apiURL}/history`)
      .then((res) => {
        setHistoryData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="history_modal">
      <div className="history_modal_container">
        <div className="history_modal_header">
            <div></div>
            <h3>Display history</h3>
            <button className="btn btn-danger" style={{transform: 'translateY(2px)'}} onClick={() => setHistory(false)}>Close</button>
        </div>
        <div className="history_modal_header_body">
          {historyData &&
            historyData.map((history, index) => (
              <HistoryCard history={history} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
