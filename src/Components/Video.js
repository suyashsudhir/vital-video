import React, {useContext} from 'react';

import {SocketContext} from '../Contexts/Context';

export default function Video() {
    const context = useContext(SocketContext);

    if (context.stream && !context.callAccepted) {
      return (
        <div className="container-fluid">
          <div className="row d-flex justify-content-center">
            <div className="col col-xs-8 col-md-6 video-stream mr-5">
              <div className="h2 d-flex justify-content-center">
                {context.name || "Name"}
              </div>
              <div className="d-flex justify-content-center">
                <video
                  width="80%"
                  className="mt-5 "
                  ref={context.myVideo}
                  autoPlay
                  muted={context.muteAudio}
                  playsInline
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return(
         <div className="container-fluid">
          <div className="row d-flex justify-content-center">
        <div className="col col-xs-8 col-md-6 video-stream ">
               <div className="h2 d-flex justify-content-center">
                 {context.name || "Name"}
               </div>
               <div className="d-flex justify-content-center">
                 <video
                  width="80%"
                  className="mt-5 "
                  ref={context.peerVideo}
                  autoPlay
                  muted={context.muteAudio}
                  playsInline
                />
              </div>

          </div>
            </div>
            </div>
      );

    }
    
    // return (
    //   <div className="container-fluid">
    //     <div className="row p-5">
    //       {context.stream && context.stream.getVideoTracks()[0].enabled ? (
    //         <>
               
    //             <div className="col col-xs-8 col-md-6 video-stream mr-5">
    //               <div className="h2 d-flex justify-content-center">
    //                 {context.name || "Name"}
    //               </div>
    //               <div className="d-flex justify-content-center">
    //                 <video
    //                   width="80%"
    //                   className="mt-5 "
    //                   ref={context.myVideo}
    //                   autoPlay
    //                   muted={context.muteAudio}
    //                   playsInline
    //                 />
    //               </div>
    //             </div>
              
    //         </>
    //       ) : (
    //         <div className="col col-xs-8 col-md-6 video-stream mr-5">
    //           <div className="h2 d-flex justify-content-center align-items-center">
    //             {context.name || "Name"}
    //           </div>
    //         </div>
    //       )}

    //       {context.callAccepted && !context.callEnded && (
    //         <div className="col col-xs-8 col-md-6 video-stream ">
    //           <div className="h2 d-flex justify-content-center">
    //             {context.name || "Name"}
    //           </div>
    //           <div className="d-flex justify-content-center">
    //             <video
    //               width="80%"
    //               className="mt-5 "
    //               ref={context.peerVideo}
    //               autoPlay
    //               muted={context.muteAudio}
    //               playsInline
    //             />
    //           </div>
    //         </div>
    //       )}
    //       {console.log(!context.stream? 'Hello': context.stream.getVideoTracks()[0], 'jasdbfb')}
    //     </div>
    //   </div>
    // );
}
