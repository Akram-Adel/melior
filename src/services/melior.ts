import Axios from 'axios';

const MeliorApi = Axios.create({ baseURL: 'https://staging.mymelior.com/v1' });

// Add token to the request since it is of fixed value
MeliorApi.interceptors.request.use(async (config) => {
  const updatedConfig = {
    ...config,
    headers: { Authorization: 'Bearer SLSmxK17vjRInEWIiFQjwE1QIDfeSM' },
  };
  return updatedConfig;
});

export default MeliorApi;
