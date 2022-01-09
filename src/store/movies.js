import { reactive } from "vue";
import { user } from "./user.js";

class Movies {
  baseUrl = import.meta.env.VITE_BACKEND_URL + "movies/";

  state = reactive({
    movies: [
      // {
      //   id: String,
      //   userId: String,
      //   accessType: String,
      //   title: String,
      //   year: Number,
      //   languages: String,
      //   poster: String,
      //   video: String,
      // },
    ],
  });

  constructor() {}

  async getAllMovies(log = console.log) {
    if (this.state.movies.length > 0) return;
    log("getting all movies...");
    const response = await fetch(this.baseUrl, {
      method: "get",
      headers: {
        Authorization: "Bearer " + user.state.token,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      log("get all movies error " + error.message);
      return false;
    }

    this.state.movies = await response.json();
    log(false);
    return true;
  }

  async getMovie(id, log = console.log) {
    const index = this.state.movies.findIndex((m) => m.id == id);
    if (index >= 0) return this.state.movies[index];

    log("getting movie...");
    const response = await fetch(this.baseUrl + id, {
      method: "get",
      headers: {
        Authorization: "Bearer " + user.state.token,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      log("get movie error " + error.message);
      return false;
    }
    const movie = await response.json();
    this.state.movies.push(movie);
    log(false);
    return movie;
  }

  async deleteMovie(id, log = console.log) {
    const index = this.state.movies.findIndex((m) => m.id == id);
    if (index < 0) return log("movie not found to delete");

    log("deleting movie...");
    this.state.movies.splice(index, 1);

    const response = await fetch(this.baseUrl + id, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + user.state.token,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      log("delete movie error " + error.message);
      return false;
    }
    log("movie deleted");
    return true;
  }

  async updateMovie(movie, log = console.log) {
    const index = this.state.movies.findIndex((m) => m.id == movie.id);
    if (index < 0) return log("movie not found to update");

    log("updating movie...");

    const response = await fetch(this.baseUrl + movie.id, {
      method: "put",
      headers: {
        Authorization: "Bearer " + user.state.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });

    if (!response.ok) {
      const error = await response.json();
      log("update movie error " + error.message);
      return false;
    }
    this.state.movies[index] = movie;
    log("movie updated");
    return true;
  }

  async addMovie(movie, log = console.log) {
    log("uploading movie...");
    const response = await fetch(this.baseUrl, {
      method: "post",
      headers: {
        Authorization: "Bearer " + user.state.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...movie }),
    });

    if (!response.ok) {
      const error = await response.json();
      log("add movie error " + error.message);
      return false;
    }

    const { id } = await response.json();
    movie.id = id;

    this.state.movies.push(movie);
    log("movie added");
    return true;
  }

  async imdbSearch(query, log = console.log) {
    log("searching movie...");

    const response = await fetch(
      this.baseUrl + "search?" + new URLSearchParams(query),
      {
        method: "get",
        headers: {
          Authorization: "Bearer " + user.state.token,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      log("search movie error " + error.message);
      return false;
    }

    const movies = await response.json();
    log(false);
    return movies;
  }
}

const movies = new Movies();
export { movies };
