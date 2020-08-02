import { isArrayEmpty, getProp } from "../utils/utils";

export const flattenAllJobsWithContact = (allJobsWithContactData = []) => {
    const allJobsWithContactList = isArrayEmpty(allJobsWithContactData) ? [] : allJobsWithContactData;
    return allJobsWithContactList.map((item) => ({
        ...item,
        contact: getProp(item, 'contact') ? getProp(item, 'contact.name', undefined) : undefined
    }));
}