import { useState } from 'react';
import './VideoPool.css';
import { CiEdit, CiTrash } from "react-icons/ci";
import { IoCheckmarkOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


const VideoPool = () => {
  const [currentPage, setCurrentPage] = useState(1); // Aktif sayfa numarası
  const [videosPerPage] = useState(10); // Sayfa başına gösterilecek video sayısı
  const [allVideos, setAllVideos] = useState([
    'adres gezgini ',
    'canva 100.yıl',
    'lol12345 aa ',
    'Video 4 ',
    'Video 5 ',
    'Video 6 ',
    'Video 7 ',
    'Video 8 ',
    'Video 9 ',
    'Video 10',
    'Video 11',
    'Video 12',
    'Video 13',
    'Video 14',
    'Video 15',
    'Video 16',
    'Video 17',
    'Video 18',
    'Video 19',
    'Video 20',
  ]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedName, setEditedName] = useState('');
  const navigate = useNavigate();

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = allVideos.slice(indexOfFirstVideo, indexOfLastVideo);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (index) => {
    const updatedVideos = [...allVideos];
    updatedVideos.splice(indexOfFirstVideo + index, 1);
    setAllVideos(updatedVideos);
    if (currentVideos.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(indexOfFirstVideo + index);
    setEditedName(allVideos[indexOfFirstVideo + index]);
  };

  const handleSaveEdit = (index) => {
    const updatedVideos = [...allVideos];
    updatedVideos[indexOfFirstVideo + index] = editedName;
    setAllVideos(updatedVideos);
    setEditingIndex(-1);
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
              {editingIndex === index + indexOfFirstVideo ? (
                <div className="edit-container">
                  <input
                    className='input-field'
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                  <IoCheckmarkOutline 
                    className="done-icon"
                    size='1.7rem'
                    cursor='pointer'
                    onClick={() => handleSaveEdit(index)}
                  />
                </div>
              ) : (
                <span>{video}</span>
              )}
              <div className="item-pack">
                <CiEdit
                  className='item'
                  size='1.7rem'
                  cursor='pointer'
                  onClick={() => handleEdit(index)}
                />
                <CiTrash
                  className='item-2'
                  size='1.7rem'
                  cursor='pointer'
                  onClick={() => handleDelete(index)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
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
