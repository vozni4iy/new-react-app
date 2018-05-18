import axios from 'axios';

const baseURL = 'https://test-task-server.herokuapp.com/api';

const api = axios.create({
  baseURL,
});

export const actionWrapper = ({ ...config, onSuccess, onError }) => async (dispatch) => {
  console.log('wrapper called');
  try {
    const response = await(api(config));
    onSuccess && dispatch(onSuccess(response, dispatch));
  } catch (err) {
    (onError && onError()) || console.log('error: ', err);
  }
}

export default api;
