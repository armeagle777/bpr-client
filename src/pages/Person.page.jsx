import MuiAlert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';

import PersonInfoPage from '../components/person/PersonInfoPage';
import PersonNotFound from '../components/notFound/PersonNotFound';
import PersonPageSkeleton from '../components/personPageSkeleton/PersonPageSkeleton';
import useFetchPerson from '../hooks/useFetchPerson';

const PersonPage = () => {
  const { ssn } = useParams();

  const { data, isLoading, isError, error } = useFetchPerson(ssn);
  if (isLoading) {
    return <PersonPageSkeleton />;
  }

  if (isError) {
    return <MuiAlert severity="error">{error?.response?.data?.message || error.message}</MuiAlert>;
  }

  return data && data.length === 0 ? <PersonNotFound /> : <PersonInfoPage personInfo={data} />;
};

export default PersonPage;
