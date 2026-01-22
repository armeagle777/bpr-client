import useTestamentsData from '../../hooks/useTestamentsData';

const EscsTestamentTab = (ssn) => {
  const { error, isError, isLoading, data } = useTestamentsData(ssn);
  return <div>EscsTestamentTab</div>;
};

export default EscsTestamentTab;
