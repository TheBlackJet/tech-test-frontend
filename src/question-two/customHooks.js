
import React, { useEffect, useReducer, useState } from 'react';
import { getProp } from '../utils/utils';


const getActivityAllocationByRescourceId = ({eventAllocations = [], resourceId = null, eventSource = []}) => {
    return getEventAllocationByRescourceId({eventAllocations, resourceId, eventSource, type: 'activity'})
  }
  
  
  const getJobAllocationByRescourceId = ({eventAllocations = [], resourceId = null, eventSource = []}) => {
    return getEventAllocationByRescourceId({eventAllocations, resourceId, eventSource, type: 'job'})
  }
  
  
  const getEventAllocationByRescourceId = ({eventAllocations = [], resourceId = null, eventSource = [], type = ''}) => {
    return eventAllocations.map((event) => {
      if (getProp(event, 'resourceId', null) === resourceId){
        const formattedEvent = eventSource.find((evt) => evt.id === event[`${type}Id`]);
        formattedEvent.type = type;
        return formattedEvent;
      }
      return undefined;
    }).filter(n=>n);
  }


export const useCreatingSwimlane = ({service}) => {
    const [ workforceEventData, setWorkforceEventData ] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // get all related data
        const allJob = await service.getJobs();
        const allResource  = await service.getResources();
        const allActivities = await service.getActivities();
        const allJobAllocation = await service.getJobAllocations();
        const allActivityAllocation = await service.getActivityAllocations();

        // build workforce event list
        const workforceEventData =  Array.isArray(allResource) ? allResource.map((resource) => {
          // find related activity allocations
          const allocatedActivity = getActivityAllocationByRescourceId({eventAllocations: allActivityAllocation, resourceId: getProp(resource, 'id', null), eventSource: allActivities});
          const allocatedJob = getJobAllocationByRescourceId({eventAllocations: allJobAllocation, resourceId: getProp(resource, 'id', null), eventSource: allJob});
          // merge job and activity event
          const mergedEventList = [...allocatedActivity.concat(allocatedJob)];

          const cards = mergedEventList.map((evtItem) => {
              const isJobEvent = evtItem.type === 'job';
            return {
              description: getProp(evtItem, 'name', ''),
              start:new Date(getProp(evtItem, 'start', '')),
              end:new Date(getProp(evtItem, 'end', '')),
              style: {
                color: isJobEvent ? 'blue' : 'green',
              }
            };
          });

          return  {
            title: getProp(resource, 'name', ''),
            cards
          };
        }) : [];

        setWorkforceEventData(workforceEventData);
      } catch (error) {
        console.log(error);
      }
    };
 
    fetchData();

  }, []);

  return {
    workforceEventData
  }

}