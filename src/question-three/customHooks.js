
import { useEffect, useState } from 'react';
import { getProp } from '../utils/utils';

const appendZeroToOneDigitTime= (time) => {
    return String(time).padStart(2, "0");
}

export const useJobsDataFromAPI = ({ service }) => {
    const [ jobData, setJobData ] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // get all related data
                const allJob = await service.getJobs();
                const allJobAllocation = await service.getJobAllocations();

                // build job list with number of allocated resource
                const jobsWithAllocatedResource = allJob.map((item) => {
                    const numberOfAllocation = allJobAllocation.filter((alloc) => alloc.jobId === item.id);
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

    return {
        jobData
    }

}