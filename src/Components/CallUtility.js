import React, { useContext, useState } from "react";
import copyIcon from "../assets/img/copy-white.svg";
import callIcon from "../assets/img/call-white.svg";
import callEndIcon from "../assets/img/end-call-white.svg";
import microphone from "../assets/img/mic_white_48dp.svg";
import microphoneOff from "../assets/img/mic_off_white_48dp.svg";
import videoIcon from "../assets/img/videocam_white_48dp.svg";
import videooffIcon from "../assets/img/videocam_off_white_48dp.svg";
import screenIcon from "../assets/img/screen-white.svg";
import { SocketContext } from "../Contexts/Context";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function CallUtility({ children }) {
  //const [name, setname] = useState('');
  const [idToCall, setidToCall] = useState("");
  const {
    callAccepted,
    currentId,
    name,
    setname,
    makeCall,
    endCall,
    callEnded,
    muteAudio,
    setmuteAudio,
    
    shareScreen,
    stream,
    screenShareStream,
  } = useContext(SocketContext);
  const [videoOff, setVideoOff] = useState(true);
  const handleVideoToggle = () => {
    stream.getVideoTracks()[0].enabled = !stream.getVideoTracks()[0].enabled;
    setVideoOff(!videoOff);
  };

  console.log(!screenShareStream? 'hello': screenShareStream.getTracks(), screenShareStream)
  if(screenShareStream){
    screenShareStream.onended = () => console.log('ended')
  }
  return (
    <div className="container-fluid">
      <div className="row mb-5">
        <div className="col col-xs-12 col-md-6">
          <div className="row d-flex justify-content-center flex-column align-items-center">
            <p className="font-20 d-flex justify-content-center mt-4">{`Your meeting id: ${currentId}`}</p>
            <input
              className="site-input mt-5 w-50"
              placeholder="Enter Name"
              onChange={(e) => setname(e.target.value)}
              value={name}
            />
            {callAccepted && !callEnded ? (
              <div className="row d-flex justify-content-center align-items-center mt-5">
                <div className="col-3 d-flex justify-content-center ">
                  <button
                    className="call-btn d-flex justify-content-center align-items-center"
                    onClick={() => setmuteAudio(!muteAudio)}
                  >
                    <img
                      alt="mute-audio"
                      height="30px"
                      width="30px"
                      src={muteAudio ? microphoneOff : microphone}
                    />
                  </button>
                </div>
                <div className="col-3 d-flex justify-content-center ">
                  <button
                    className="call-btn d-flex justify-content-center align-items-center"
                    onClick={(kind) => {
                      handleVideoToggle();
                      console.log(stream.getVideoTracks()[0])
                    }}
                  >
                    <img
                      alt="mute-audio"
                      height="30px"
                      width="30px"
                      src={videoOff ? videooffIcon : videoIcon}
                    />
                  </button>
                </div>
                <div className="col-3 d-flex justify-content-center ">
                  <button
                    className="call-btn d-flex justify-content-center align-items-center"
                    onClick={(kind) => {
                      shareScreen();
                      
                    }}
                  >
                    <img
                      alt="mute-audio"
                      height="30px"
                      width="30px"
                      src={screenIcon}
                    />
                  </button>
                </div>
                <div className="col-3 d-flex justify-content-center ">
                  <button
                    className="call-btn d-flex justify-content-center align-items-center"
                    onClick={endCall}
                  >
                    <img
                      alt="mute-audio"
                      height="30px"
                      width="30px"
                      src={callEndIcon}
                    />
                  </button>
                </div>
              </div>
            ) : (
              <CopyToClipboard text={currentId}>
                <button className="w-50 site-btn mt-3">
                  <img alt="copy-id" src={copyIcon} height={10} width={10} />
                  Copy Id
                </button>
              </CopyToClipboard>
            )}
          </div>
        </div>
        {/* <button
            onClick={() => {
              shareScreen();
            }}
          >
            Stop
          </button> */}

        {!callEnded && callAccepted ? //         alt="call-end" //       <img //     <button className="w-50 site-btn mt-3" onClick={endCall}> //   <div className="row d-flex justify-content-center flex-column align-items-center"> // <div className="col col-xs-12 col-md-6">
        //         src={callEndIcon}
        //         height={10}
        //         width={10}
        //       />
        //       End Call
        //     </button>
        //   </div>
        // </div>
        null : (
          <div className="col col-xs-12 col-md-6">
            <div className="row d-flex justify-content-center flex-column align-items-center">
              {/* <input
                  className="site-input mt-5 w-50"
                  placeholder="Enter Id to call"
                /> */}

              <input
                className="site-input mt-5 w-50"
                placeholder="Enter Id to call"
                onChange={(e) => setidToCall(e.target.value)}
              />
              <button
                className="w-50 site-btn mt-3"
                onClick={() => makeCall(idToCall)}
              >
                <img alt="call-id" src={callIcon} height={10} width={10} />
                Make a Call
              </button>
            </div>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
