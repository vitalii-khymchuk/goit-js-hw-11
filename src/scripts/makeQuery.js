import axios from 'axios';

export default function makeSearchQuery(
  query,
  pageNumber = 1,
  itemsOnPage = 10
) {
  const options = {
    baseURL: 'https://pixabay.com/api/',
    method: 'get',
    params: {
      key: '30038991-f32bd01169e2b8884a35adff1',
      q: `${query}`,
      per_page: `${itemsOnPage}`,
      page: `${pageNumber}`,
    },
    responseType: 'application/json',
  };
  return axios(options);
}
