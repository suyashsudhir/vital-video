import React,{useContext, useState} from 'react';
import callIcon from "../assets/img/incoming-call.svg";
import { SocketContext } from '../Contexts/Context';
import callGreen from "../assets/img/call-green.svg";
import callEnd from "../assets/img/call-end-red.svg";

export default function CallingScreen() {

    const { call, callAccepted, answerCall, name, stream } =
      useContext(SocketContext);
    const [dismissNotification, setDismissNotification] = useState(false);
    
      return (
        <div className="container-fluid">
          <div
            className="position-fixed bottom-0 end-0 p-3"
            style={{ zIndex: 5 }}
          >
            <div
              id="liveToast"
              className={`toast ${
                call.isCallReceived && !callAccepted && !dismissNotification
                  ? "show"
                 : "hide" 
              }`}
              //   className="toast show"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div className="toast-header">
                <img
                  src={callIcon}
                  className="rounded me-2"
                  alt="..."
                  height="20px"
                  width="20px"
                />
                <strong className="me-auto">Incoming Call</strong>
                <small>Just Now</small>
                <button
                  onClick={() => setDismissNotification(true)}
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                ></button>
              </div>
              <div className="toast-body">
                {name} is Calling
                <div className="row" style={{ float: "right" }}>
                  <div className="col-6">
                    <button
                      onClick={() => {
                        console.log(stream.getTracks());
                        answerCall();
                      }}
                      style={{
                        outline: "none",
                        background: "none",
                        border: "none",
                      }}
                    >
                      <img src={callGreen} alt="accept-call" />
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      onClick={() => setDismissNotification(true)}
                      style={{
                        outline: "none",
                        background: "none",
                        border: "none",
                      }}
                    >
                      <img src={callEnd} alt="reject-call" />
                    </button>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}
