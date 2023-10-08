import axios from 'axios';

export const URL = '//localhost:5001';
export const SourceDataService = {
    async postSourceData(sourceData, details) {
        const data = {
            sourceData,
            details
        }
        await axios.post(`${URL}/api/post-data-source`, data)
    },
}