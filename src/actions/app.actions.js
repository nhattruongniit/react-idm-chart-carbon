export const SET_LOADING = 'APP/SET_LOADING_VISIBILITY';
export const SET_LOADING_MESSAGE = 'APP/SET_MENSET_LOADING_MESSAGE';
export const SET_API_BASE_URL = 'APP/SET_API_BASE_URL';
export const SET_APP_INITIALIZED = 'APP/SET_APP_INITIALIZED';

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: { isLoading },
});

export const setLoadingMessage = (message) => ({
  type: SET_LOADING_MESSAGE,
  payload: { message },
});

export const setApiBaseUrl = (apiBaseUrl) => ({
  type: SET_API_BASE_URL,
  payload: { apiBaseUrl },
});

export const setAppInitial = () => ({
  type: SET_APP_INITIALIZED,
});
