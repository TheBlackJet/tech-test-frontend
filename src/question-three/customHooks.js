
import { useEffect, useState } from 'react';

import { getProp, isArrayEmpty } from '../utils/utils';
import { appendZeroToOneDigitTime } from './helpers';

export const useJobsData = ({ service }) => {
    const [ jobData, setJobData ] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // get all related data
                const allJobData = await service.getJobs();
                const allJobList = isArrayEmpty(allJobData) ? [] : allJobData;
                const allJobAllocationData = await service.getJobAllocations();
                const allJobAllocationList = isArrayEmpty(allJobAllocationData) ? [] : allJobAllocationData;

                // build job list with number of allocated resource
                const jobsWithAllocatedResource = isArrayEmpty(allJobList) ? [] : allJobList.map((item) => {
                    const numberOfAllocation = isArrayEmpty(allJobAllocationList) ? [] : allJobAllocationList.filter((alloc) => getProp(alloc, 'jobId', null) === getProp(item, 'id', null));
                    const startDate = new Date(getProp(item, 'start', null));
                    const endDate = new Date(getProp(item, 'end', null));
                    const startDateString = startDate.toDateString();
                    const endDateString = endDate.toDateString();
                    const date = (startDateString === endDateString) ? startDateString : `${startDateString} - ${endDateString}`;
                    const startTime = `${appendZeroToOneDigitTime(startDate.getHours())}:${appendZeroToOneDigitTime(startDate.getMinutes())}`;
                    const endTime = `${appendZeroToOneDigitTime(endDate.getHours())}:${appendZeroToOneDigitTime(endDate.getMinutes())}`;
                    return {
                        jobId: getProp(item, 'id', null),
                        jobName: getProp(item, 'name', null),
                        jobLocation: getProp(item, 'location', null),
                        date: date,
                        startTime: startTime,
                        endTime: endTime,
                        numberOfAllocation: getProp(numberOfAllocation, 'length', 0),
                    }
                });

                setJobData(jobsWithAllocatedResource);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return [
        jobData
    ]

}