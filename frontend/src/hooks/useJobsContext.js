import {JobContext} from '../context/jobContext';
import {useContext} from 'react';

export const useJobsContext = () => {
    const context = useContext(JobContext);
    if (!context) {
        throw new Error('useJobsContext must be used within a JobsProvider');
    }
    return context;
}