import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import Axios from 'axios';

const graphClient = new ApolloClient({
  uri: 'http://localhost:3500/graphql'
});

const axiosClient = Axios.create({
  baseURL: 'http://localhost:3400'
});

const getDataFromAPIPath = async (path) => {
  try {
    const response = await axiosClient.get(path);
    return response.data;
  } catch (error) {
    return {
      error : true,
    }
  }
}

export const DataService = {
  //
  //  SAMPLE GraphQL Call
  //
  // getJobsWithSearchTerm: (searchTerm) => {
  //   return graphClient.query({
  //     query: gql`
  //     query ($searchTerm: String){
  //       jobs(name: $searchTerm) {
  //         name,
  //         start,
  //         end,
  //         contact {
  //           id
  //           name
  //         }
  //       }
  //     }
  //     `,
  //     variables: {
  //       searchTerm: searchTerm
  //     }
  //   })
  //     .then(result => result.data)
  //     .then(data => data.jobs)
  // },

  getJobs: async () => {
    return await getDataFromAPIPath('/jobs');
  },

  getJobsWithContactByQuery: async (query = null, parentEntity = null) => {
    return await getDataFromAPIPath(`/jobs?q=${query}&_expand=${parentEntity}`);
  },

  getContacts: async () => {
    return await getDataFromAPIPath('/contacts');
  },

}