 /* eslint-disable */
import React, { createContext, useState, useRef, useEffect } from 'react';
import {io} from 'socket.io-client';
import Peer from 'simple-peer';


const SocketContext = createContext();
const socket = io('https://wbrtc-app-server.herokuapp.com/'
  );

function Context({ children }) {

    const [stream, setstream] = useState();
    const [currentId, setcurrentId] = useState('');
    const [call, setcall] = useState({});
    const [callAccepted, setcallAccepted] = useState(false);
    const [name, setname] = useState('');
    const [callEnded, setcallEnded] = useState(false);
    const [muteAudio, setmuteAudio] = useState(true);
    const [screenShareStream, setscreenShareStream] = useState();
    const [isScreenSharing, setisScreenSharing] = useState(false);


    const myVideo = useRef();
    const peerVideo = useRef();
    const connectionRef = useRef();
    const screenShareRef = useRef();


    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(currentStream => {
            setstream(currentStream);
            
       
            myVideo.current.srcObject = currentStream;

        });

        
        socket.on('currentId', id => setcurrentId(id));

        socket.on('callUser', ({ name: callerName, from, signal }) => {
            
            setcall({ isCallReceived: true, name: callerName, from, signal });
        });


    }, []);


    const shareScreen = () => {
        navigator.mediaDevices.getDisplayMedia({ video: true }).then(data => {
            setscreenShareStream(data);
            setisScreenSharing(true);
            screenShareRef.current.srcObject = data;
            
            
        });
    }

    const answerCall = () => {
        setcallAccepted(true);
        const peer = new Peer({
            initiator: false, trickle: false, stream: stream
        });

        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from })
        });

        peer.on('stream', (currentStream) => {
            
            peerVideo.current.srcObject = currentStream;
            
        });
        
        peer.signal(call.signal);

        connectionRef.current = peer;

    }

    const makeCall = (id) => {
        const peer = new Peer({
            initiator: true, trickle: false, stream: stream
        });

        peer.on('signal', (data) => {
            socket.emit('callUser', { idToCall: id, signalData: data, from: currentId, name })
        });
        peer.on('stream', (currentStream) => {
            peerVideo.current.srcObject = currentStream;
        });


        socket.on('callAccepted',(signal) => {
            setcallAccepted(true);
            
            peer.signal(signal);

        });
        connectionRef.current = peer;

    }

    const endCall = () => {
        setcallEnded(true);
        connectionRef.current.destroy();
        window.location.reload();
    }




    return (
        <SocketContext.Provider value={{
            call, callAccepted,setcallAccepted, currentId, myVideo, peerVideo, answerCall, stream, name, setname, makeCall, endCall, callEnded, setcallEnded, muteAudio, setmuteAudio, shareScreen, screenShareStream, setscreenShareStream
        ,isScreenSharing, screenShareRef}}>
            {children}
        </SocketContext.Provider>
    )
}

export {Context, SocketContext};
