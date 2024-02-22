import axios from "axios";

const baseURL = "http://164.92.200.35:5219/"; // Replace with your API base URL

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const setAuthHeader = (accessToken) => {
  instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

export const validateToken = async (accessToken) => {
  try {
    setAuthHeader(accessToken);

    const response = await instance.post("/api/saveuser/save", {});
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const getAiModals = async (accessToken) => {
  const endpoint = "/api/models";
  try {
    setAuthHeader(accessToken);

    const response = await instance.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createApp = async (formData, accessToken) => {
  try {
    setAuthHeader(accessToken);

    const response = await instance.post("/api/createapp", formData, {
      headers: {
        "Custom-Header": "value",
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getVideoProgress = async (accessToken) => {
  const endpoint = "/api/uservideo/status";
  try {
    setAuthHeader(accessToken);
    const response = await instance.get(endpoint);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const postTutorialProgress = async (accessToken) => {
  try {
    setAuthHeader(accessToken);
    const response = await instance.post(
      "/api/uservideo/updatetutorial",
      {
        isTutorialDone: true,
      },
      {
        headers: {
          "Custom-Header": "value",
        },
      }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const postVideoProgress = async (accessToken, videoCreds) => {
  try {
    setAuthHeader(accessToken);

    const response = await instance.post(
      "/api/uservideo/updatewatched",
      {
        isWatchedAll: videoCreds.isWatchedAll,
        WatchedVideoId: videoCreds.WatchedVideoId,
        WatchedTimeInseconds: videoCreds.WatchedTimeInseconds,
      },
      {
        headers: {
          "Custom-Header": "value",
        },
      }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getVideos = async (accessToken) => {
  try {
    setAuthHeader(accessToken);
    const response = await instance.get("/api/videos");
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getSettings = async (accessToken) => {
  try {
    setAuthHeader(accessToken);
    const response = await instance.get(
      "/api/application-settings/getapplication"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Quiz Status - Get
export const getQuizStatus = async (accessToken) => {
  const endpoint = "/api/quiz/isPassedStatus";
  try {
    setAuthHeader(accessToken);

    const response = await instance.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Quiz - Get
export const getQuestions = async (accessToken) => {
  const endpoint = "/api/quiz/questions";
  try {
    setAuthHeader(accessToken);

    const response = await instance.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Quiz - Post
export const postQuestionResponses = async (accessToken, responses) => {
  const endpoint = "/api/quiz/submit";
  try {
    setAuthHeader(accessToken);

    const response = await instance.post(endpoint, responses);

    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Question Upload to DB
export const uploadQuestionDB = async (accessToken, question) => {
  const endpoint = "/api/QuestionAndVideo/postquestion"
  try {
    setAuthHeader(accessToken);
    const response = await instance.post(endpoint, question);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Video Upload to DB
export const formData = async (accessToken, video) => {
  const endpoint = "api/adminvideo/upload";
  try {
    setAuthHeader(accessToken);
    const response = await instance.post(endpoint, video);
    return response.data;
  } catch (error) {
    throw error;
  }
};


// Veritabanından videoları çekmek için bir fonksiyon (videomanagement.jsx)
export const fetchVideosFromDatabase = async () => {
  const endpoint = "/api/videos"; 
  try {
    const response = await instance.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Yeni video sırasını veritabanına göndermek için bir fonksiyon (videomanagement.jsx)
export const updateVideoOrderInDatabase = async (accessToken, updatedVideos) => {
  const endpoint = "/api/update-video-order"; 
  try {
    setAuthHeader(accessToken); 
    const response = await instance.post(endpoint, updatedVideos);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Video detaylarını güncellemek için bir fonksiyon (videoupdating.jsx)
export const updateVideoDetailsInDatabase = async (updatedVideoDetails) => {
  const endpoint = "/api/update-video-details";
  try {
    const response = await instance.put(endpoint, updatedVideoDetails);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Veritabanından video isimlerini çekmek için bir fonksiyon (VideoPool.jsx)
export const fetchVideoNamesFromDatabase = async () => {
  const endpoint = "/api/videos"; 
  try {
    const response = await instance.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Belirli bir videoyu veritabanından silmek için bir fonksiyon (videopool.jsx)
export const deleteVideoFromDatabase = async (videoId) => {
  const endpoint = `/api/videos/${videoId}`; 
  try {
    const response = await instance.delete(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};