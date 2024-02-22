import React, { useState, useEffect } from 'react';
import VideoFooter from './VideoFooter';
import Guidence from './Guidence';
import Navbar from './Navbar.jsx';
import '../App.css';

// import BothSelectednPool from './ManagementPanelComponents/BothSelectednPool';
import SortedVideo from './SelectedVideos/SortedVideo.jsx';
import VideoPool from './VideoPool/VideoPool';
import { DndContext, closestCorners } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { fetchVideosFromDatabase, updateVideoOrderInDatabase } from './api';


// export default function VideoManagement() {
//   const [videos, setVideos] = useState([
//     { id: 1, title: "firstVideo.mp4"},
//     { id: 2, title: "secondVideo.mp4"},
//     { id: 3, title: "thirdVideo.mp4"},
//     { id: 4, title: "fourthVideo.mp4"},
//     { id: 5, title: "fifthVideo.mp4"},
//   ]);

//   const getVideosPosition = id => 
//   videos.findIndex(visual => visual.id === id);
  
//   const handleDragEnd = e => {
//     const {active, over} = e

//     if(active.id === over.id) return;

//     setVideos(videos => {
//       const originalPosition = getVideosPosition(active.id);
//       const newPosition = getVideosPosition(over.id);

//       return arrayMove(videos, originalPosition, newPosition)
//     });
//   };

export default function VideoManagement() {
  const [videos, setVideos] = useState([]);

  // Veritabanından videoları çekme
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const fetchedVideos = await fetchVideosFromDatabase();
        setVideos(fetchedVideos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const handleDragEnd = async e => {
    const { active, over } = e;

    if (active.id === over.id) return;

    const originalPosition = videos.findIndex(visual => visual.id === active.id);
    const newPosition = videos.findIndex(visual => visual.id === over.id);

    const updatedVideos = arrayMove(videos, originalPosition, newPosition);

    // Yeni video sırasını veritabanına gönderme
    try {
      await updateVideoOrderInDatabase(updatedVideos);
      setVideos(updatedVideos);
    } catch (error) {
      console.error('Error updating video order:', error);
    }
  };

  // const numbers = [1 , 2, 3, 4, 5];

  return (
    <>
      <Navbar />
      <Guidence title="Video Management"/>
      <div className='both-video-area'>

        <VideoPool/>
        {/* <ul>
          {numbers.map((number) => (
          <li key={number}>{number}</li>
          ))}
        </ul> */}
        <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
          <SortedVideo videos={videos}/>
        </DndContext>
        
      </div>
      <VideoFooter />
    </>
  );
};

