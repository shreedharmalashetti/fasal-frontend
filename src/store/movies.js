import { reactive } from "vue";
import { user } from "./user.js";

class Movies {
  // baseUrl = "http://localhost:8000/movies/";
  baseUrl = "https://fasal-backend.herokuapp.com/movies/";

  state = reactive({
    movies: [
      // {
      //   accessType: "private",
      //   actors: "Shivarajkumar, Prakash Belawadi, Shanvi Srivastava",
      //   country: "India",
      //   director: "Narthan",
      //   genres: "Action, Drama, Thriller",
      //   imdbid: "tt6405208",
      //   languages: "Kannada",
      //   plot: "An undercover cop goes into the big bad world (Ronapura), an place taken over by a don, where his safety may be compromised.",
      //   poster:
      //     "https://m.media-amazon.com/images/M/MV5BNjUzZGI0YWMtYWRjYy00MDE3LThjYjEtZDYzYTg4NzAxZjUxXkEyXkFqcGdeQXVyMzQzMDc2MDk@._V1_SX300.jpg",
      //   rating: 8,
      //   runtime: "152 min",
      //   title: "Mufti",
      //   year: 2017,
      // },
    ],
  });

  constructor() {}

  async getAllMovies() {
    fetch(this.baseUrl, {
      method: "get",
      headers: {
        Authorization: "Bearer " + user.state.token,
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          const error = await response.json();
          console.log(error);
          return;
        }
        this.state.movies = await response.json();
      })
      .catch(console.log);
  }

  async searchMovie(query) {
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
      throw new Error(error.message);
    }
    const movie = await response.json();
    return movie;
  }

  async addMovie(id, type) {
    const response = await fetch(
      this.baseUrl + "add?id=" + id + "&accessType=" + type,
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
      throw new Error(error.message);
    }
    const movie = await response.json();
    this.state.movies.unshift(movie);
    return movie;
  }

  async deleteMovie(id) {
    const index = this.state.movies.findIndex((m) => m.imdbid == id);

    if (index < 0) throw new Error("movie not found");
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
      throw new Error(error.message);
    }
  }
}

const movies = new Movies();
export { movies };
