import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import AddNewVideo from './AdminPageComponents/AddNewVideo.jsx';
import VideoManagement from "./AdminPageComponents/VideoManagement.jsx";
import VideoUpdating from './AdminPageComponents/VideoUpdating.jsx';
import ChangeExistingVideo from "./AdminPageComponents/ChangeExistingVideo.jsx";

function App() {
  const [files, setFiles] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddNewVideo />} />
        <Route path="/VideoManagement" element={<VideoManagement />} />
        <Route path="/ChangeExistingVideo" element={<ChangeExistingVideo files={files} setFiles={setFiles}/>} />
      </Routes>
    </Router>
  );
}

export default App;
