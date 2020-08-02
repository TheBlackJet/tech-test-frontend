
import { useEffect, useState } from 'react';

import { getProp, isArrayEmpty } from '../utils/utils';

import { EVENT_TYPE } from '../constants/app_conts'
import { getActivityAllocationByRescourceId, getJobAllocationByRescourceId } from './helpers';

export const useSwimlaneData = ({ service }) => {
    const [workforceEventData, setWorkforceEventData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // get all related data
                const allJobData = await service.getJobs();
                const allJobList = isArrayEmpty(allJobData) ? [] : allJobData;
                const allResourceData = await service.getResources();
                const allResourceList = isArrayEmpty(allResourceData) ? [] : allResourceData;
                const allActivitiesData = await service.getActivities();
                const allActivitiesList = isArrayEmpty(allActivitiesData) ? [] : allActivitiesData;
                const allJobAllocationData = await service.getJobAllocations();
                const allJobAllocationList = isArrayEmpty(allJobAllocationData) ? [] : allJobAllocationData;
                const allActivityAllocationData = await service.getActivityAllocations();
                const allActivityAllocationList = isArrayEmpty(allActivityAllocationData) ? [] : allActivityAllocationData;

                // build workforce event list
                const workforceEventData = allResourceList.map((resource) => {
                    // find related activity allocations
                    const allocatedActivity = getActivityAllocationByRescourceId({ eventAllocations: allActivityAllocationList, resourceId: getProp(resource, 'id', null), eventSource: allActivitiesList });
                    const allocatedJob = getJobAllocationByRescourceId({ eventAllocations: allJobAllocationList, resourceId: getProp(resource, 'id', null), eventSource: allJobList });
                    // merge job and activity event
                    const mergedEventList = [...allocatedActivity.concat(allocatedJob)];

                    const cards = mergedEventList.map((evtItem) => {
                        const isJobEvent = evtItem.type === EVENT_TYPE.JOB;
                        return {
                            id: getProp(evtItem, 'id', ''),
                            description: getProp(evtItem, 'name', ''),
                            start: new Date(getProp(evtItem, 'start', '')),
                            end: new Date(getProp(evtItem, 'end', '')),
                            style: {
                                color: isJobEvent ? 'blue' : 'green',
                            }
                        };
                    });

                    return {
                        id: getProp(resource, 'id', ''),
                        title: getProp(resource, 'name', ''),
                        cards
                    };
                });

                setWorkforceEventData(workforceEventData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();

    }, []);

    return [
        workforceEventData
    ];

}