import Navbar from "./Navbar";
import Guidence from "./Guidence";
import { VideoUploadContainer } from "./VideoUploadContainer";
import VideoFooter from './VideoFooter';

function AddNewVideo() {

    
  
    return (
      <>
        <Navbar/>
        <Guidence title="Add New Video"/>
        <VideoUploadContainer />
        <VideoFooter/>
      </>
    );
  }
  
  export default AddNewVideo;