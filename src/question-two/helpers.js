import { isArrayEmpty, getProp } from "../utils/utils"
import { EVENT_TYPE } from '../constants/app_conts';

export const getActivityAllocationByRescourceId = ({ eventAllocations = [], resourceId = null, eventSource = [] }) => {
    return getEventAllocationByRescourceId({ eventAllocations, resourceId, eventSource, type: EVENT_TYPE.ACTIVITY })
}


export const getJobAllocationByRescourceId = ({ eventAllocations = [], resourceId = null, eventSource = [] }) => {
    return getEventAllocationByRescourceId({ eventAllocations, resourceId, eventSource, type: EVENT_TYPE.JOB })
}


const getEventAllocationByRescourceId = ({ eventAllocations = [], resourceId = null, eventSource = [], type = '' }) => {
    const eventAllocationList = isArrayEmpty(eventAllocations) ? [] : eventAllocations;
    return eventAllocationList.map((event) => {
        if (getProp(event, 'resourceId', null) === resourceId) {
            const formattedEvent = eventSource.find((evt) => evt.id === event[`${type}Id`]);
            if (formattedEvent) {
                formattedEvent.type = type;
                return formattedEvent;
            }
            return undefined;
        }
        return undefined;
    }).filter(n => n);
}