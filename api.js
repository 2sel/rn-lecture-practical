const API_KEY = "a5c90a31f854bc5e735311d40777156c";
const BASE_URL = "https://api.themoviedb.org/3/movie";

export const getNowPlaying = () =>
  fetch(
    `${BASE_URL}/now_playing?api_key=${API_KEY}&language=ko-US&page=1`
  ).then((res) => res.json());

export const getTopRated = () =>
  fetch(`${BASE_URL}/top_rated?api_key=${API_KEY}&language=ko-US&page=1`).then(
    (res) => res.json()
  );

export const getUpcoming = () =>
  fetch(`${BASE_URL}/upcoming?api_key=${API_KEY}&language=ko-US&page=1`).then(
    (res) => res.json()
  );

export const getDetail = (params) => {
  console.log("params:", params);
  const [_, movieId] = params.queryKey;
  return fetch(
    `${BASE_URL}/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
  ).then((res) => res.json());
};
