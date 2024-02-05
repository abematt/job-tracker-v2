import { useContext } from 'react';
import { JobContext, JobContextType } from '../context/jobContext';

export const useJobsContext = (): JobContextType => {
  const context = useContext<JobContextType | undefined>(JobContext);

  if (!context) {
    throw new Error('useJobsContext must be used within a JobsProvider');
  }

  return context;
};