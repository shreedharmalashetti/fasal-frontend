import { reactive, ref } from "vue";
import { movies } from "../../store/movies.js";

let loadingValue = { value: null };
let accessType = "public";
let addedCallback = () => {};

const initialize = (r, at, cb) => {
  loadingValue = r;
  accessType = at;
  addedCallback = cb;
};

const form = reactive({
  title: null,
  year: null,
  languages: null,
  poster: null,
  video: null,
});
const updateForm = (movie, cb) => {
  form.title = movie.title;
  form.year = movie.year;
  form.languages = movie.languages;
  form.poster = movie.poster;
  cb();
};
const clearForm = () => {
  form.title = null;
  form.year = null;
  form.languages = null;
  form.poster = null;
  form.video = null;
};

const imdbSearchForm = reactive({
  id: null,
  name: null,
  year: null,
});
const imdbSearchResult = ref([]);

const addMovie = async () => {
  await movies.addMovie(
    { ...form, accessType },
    (d) => (loadingValue.value = d)
  );
  clearForm();
  addedCallback();
};

const imdbSearch = async () => {
  const { name, year, id } = imdbSearchForm;
  if (!(name || year || id))
    return (loadingValue.value = "name or id required");

  imdbSearchResult.value = await movies.imdbSearch(
    { ...imdbSearchForm },
    (d) => (loadingValue.value = d)
  );
};

export {
  form,
  loadingValue,
  initialize,
  updateForm,
  addMovie,
  imdbSearchForm,
  imdbSearchResult,
  imdbSearch,
};
