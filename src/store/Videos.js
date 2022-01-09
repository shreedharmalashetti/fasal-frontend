import { reactive } from "vue";

class Videos {
  constructor() {}
  baseUrl = "https://addagroup-backend.herokuapp.com/";
  // baseUrl = "http://localhost:8000/";

  state = reactive({
    videos: [],
    currentVideo: { src: null, poster: "" },
  });

  async getAllVideos() {
    if (this.state.videos.length > 0) return;
    const response = await fetch(this.baseUrl + "videos", {
      method: "GET",
    });

    if (!response.ok) {
      const error = await response.json();
      this.log("get all videos error ", error.message);
      throw new Error(error.message);
    }
    this.state.videos = await response.json();
    // console.log(this.state.videos)
  }

  log(data) {
    console.log(data);
  }
}

const videos = new Videos();

export { videos };
