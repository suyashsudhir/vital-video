

import 'bootstrap/dist/css/bootstrap.css';
import './styles/styles.css';
import Video from './Components/Video';
import CallUtility from './Components/CallUtility';
import CallingScreen from './Components/CallingScreen';


function App() {
  return (
  
  <div className="container-fluid">
    <div className="d-flex justify-content-center h1 mb-5 mt-4">
      Make a call
    </div>
     <Video/>
     <CallUtility>
       <CallingScreen/>
     </CallUtility>
     
    
  </div>
    
  );
}

export default App;
