import React from "react";

const VerifyModal = ({ message, setVerified }) => {
    const  handleClose= () => {
        setVerified(false)
        window.location.href = '/'
    }
  return (
    <div className="verify_modal">
      <div className="verify_modal_container">
        <h4>Congratulations</h4>
        <p style={{color: '#198754', marginBottom: '7px', width: '100%', fontSize: '1.2rem', fontWeight: '600', padding: '10px'}}>{message}</p>
        <button className="btn btn-success mb-2" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default VerifyModal;
