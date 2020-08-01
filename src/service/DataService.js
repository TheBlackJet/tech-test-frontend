// import ApolloClient from 'apollo-boost';
// import gql from 'graphql-tag';
import Axios from 'axios';

import { API_PATH, API_ENDPOINTS } from '../constants/app_conts'; 
import { getProp } from '../utils/utils';

// const graphClient = new ApolloClient({
//   uri: API_ENDPOINTS.GRAPHQL_SERVER
// });

const axiosClient = Axios.create({
  baseURL: API_ENDPOINTS.JSON_SERVER
});

const getDataFromAPIPath = async (path = API_PATH.DEFAULT) => {
  try {
    const response = await axiosClient.get(path);
    return getProp(response, 'data', []);
  } catch (error) {
    return {
      error : true,
    }
  }
}

export const DataService = {

  getJobs: async () => {
    return await getDataFromAPIPath(API_PATH.JOBS);
  },

  getJobAllocations: async () => {
    return await getDataFromAPIPath(API_PATH.JOB_ALLOCATIONS);
  },

  getJobsWithContactByQuery: async (query = null, parentEntity = null) => {
    return await getDataFromAPIPath(`${API_PATH.JOBS}?q=${query}&_expand=${parentEntity}`);
  },

  getContacts: async () => {
    return await getDataFromAPIPath(API_PATH.CONTACTS);
  },

  getActivities: async () => {
    return await getDataFromAPIPath(API_PATH.ACTIVITIES);
  },

  getActivityAllocations: async () => {
    return await getDataFromAPIPath(API_PATH.ACTIVITY_ALLOCATIONS);
  },

  getResources: async () => {
    return await getDataFromAPIPath(API_PATH.RESOURCES);
  },
}