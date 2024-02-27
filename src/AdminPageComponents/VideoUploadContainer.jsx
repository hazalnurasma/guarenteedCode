import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./VideoUploadContainer.css";

export const VideoUploadContainer = () => {
  const [title, setTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null); // Tek bir video dosyası
  const [selectedVideo, setSelectedVideo] = useState(null); // Silinecek video
  const [isDragging, setIsDragging] = useState(false); // Drag and drop durumu
  const fileInputRef = useRef(null); // Dosya girişi için referans

  const navigate = useNavigate();

  const handleAddNewVideo = () => {
    navigate('/');
  };

  // Drag and drop bölgesine dosya bırakıldığında
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);

    if (droppedFiles && droppedFiles.length > 0) {
      const mp4Files = droppedFiles.filter(isMP4Video);
      if (mp4Files.length > 0) {
        // Sadece bir video dosyası alınacak
        setVideoFile(mp4Files[0]);
      } else {
        alert("You can only upload an MP4 file.");
      }
    }
  };

  // Seçilen dosyanın MP4 formatında olup olmadığını kontrol eder
  const isMP4Video = (file) => {
    return file.type === 'video/mp4';
  };

  // Dosya yükleme işlemi için
  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && isMP4Video(selectedFile)) {
      setVideoFile(selectedFile);
    } else {
      alert("You can only upload an MP4 file.");
    }
  };

  // Dosyanın kaldırılması için
  const handleRemoveVideo = (file) => {
    setSelectedVideo(file);
  };

  // Dosyanın kaldırılmasını onaylama
  const confirmRemoveVideo = () => {
    if (selectedVideo) {
      setVideoFile(null);
      setSelectedVideo(null);
    }
  };

  const handleTitle = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setVideoFile(e.target.files[0]);
    }
  };
  
  // Formun gönderilmesi
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      alert('Please select a video file');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('video', videoFile);
    try {
      const response = await axios.post(
        'https://6582f75e02f747c8367abde3.mockapi.io/api/v1/videos',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Video uploaded successfully:', response.data);
      console.log('formData: ', formData);
      setTitle('');
      setVideoFile(null);
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  return (
    <div className='form-area'>
      <form onSubmit={handleSubmit}>
        <div className='dnd-bar'>
          <label htmlFor='videoFile' className='page-title'>Choose an MP4 File:</label>

          <div className="drag-drop-area"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onDragLeave={() => setIsDragging(false)}
            onClick={() => fileInputRef.current.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
              accept=".mp4"
            />
            <h2 className='up-text'>Drag and Drop Area</h2>
            <p className='down-text'>Drag and drop MP4 files here or Browse.</p>
          </div>
        </div>
        <div className='video-remove-bar'>
          {videoFile && (
            <div className="file-list">
              <ul>
                <li>
                  <span className='span'>{videoFile.name}</span>
                  <button className="first-remove-btn" onClick={() => handleRemoveVideo(videoFile)}>Remove</button>
                </li>
              </ul>
            </div>
          )}
          {selectedVideo && (
            <div className="video-remove-modal">
              <h2 className='confirm-text'>Are you sure you want to remove {selectedVideo.name}?</h2>
              <button className="remove-confirm" onClick={confirmRemoveVideo}>Remove</button>
              <button className="remove-cancel" onClick={() => setSelectedVideo(null)}>Cancel</button>
            </div>
          )}
        </div>
        <div className='title-bar'>
          <label htmlFor='title' className='video-head'>Video Title:</label>
          <input 
            type="text"
            id="video-title"
            accept='.mp4 video/mp4'
            onChange={handleTitle}
          />
        </div>
        <div className="add-to-pool-container">
          <button type='submit' className="add-to-pool-btn" onClick={handleSubmit}>Add to All Videos</button>
        </div>
        <div className='route-video-management'>
          <button type='submit' className='route-btn' onClick={handleAddNewVideo}>Go to Video Management</button>
        </div>
      </form>
    </div>
  );
};
