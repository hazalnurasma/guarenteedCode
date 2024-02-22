import React, { useState, useEffect } from 'react';
import './VideoPool.css';
import { CiEdit, CiTrash } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { fetchVideoNamesFromDatabase } from '../api';


const VideoPool = () => {
  const [currentPage, setCurrentPage] = useState(1); 
  const videosPerPage = 10; 
  const [allVideos, setAllVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videoNames = await fetchVideoNamesFromDatabase();
        setAllVideos(videoNames);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  // video list of current page
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = allVideos.slice(indexOfFirstVideo, indexOfLastVideo);

  // change page number
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // video deleting func
  const handleDelete = (index) => {
    const updatedVideos = [...allVideos];
    updatedVideos.splice(indexOfFirstVideo + index, 1); // Doğru indeksi silmek için indexOfFirstVideo'e ekleyin
    setAllVideos(updatedVideos);
    // decrease page number
    if (currentVideos.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/ChangeExistingVideo');
  };

  return (
    <div className='Container'>
      <div className='titles'>
        <h1 className='first-title'>All Videos</h1>
        <h2 className='second-title'>View and browse all videos, edit video details, secure video deletion. All in one.</h2>
      </div>
      <div className="video-pool">
        <div className="video-list">
          {currentVideos.map((video, index) => (
            <div className="video-item" key={index}>
              {video}
              <div class="item-pack">
                <CiEdit className='item' size='1.2rem' cursor='pointer' onClick={handleEdit} />
                <CiTrash className='item-2' size='1.2rem' cursor='pointer' onClick={() => handleDelete(index)} />
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          {/* Sayfa numaralarını oluştur */}
          {[...Array(Math.ceil(allVideos.length / videosPerPage)).keys()].map((number) => (
            <div key={number} onClick={() => paginate(number + 1)} className="page-number">
              {number + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPool;
