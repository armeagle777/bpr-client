import { useQuery } from '@tanstack/react-query';

import { getKadastrCertByNumber } from '../api/personsApi';

const useFetchResidenceDocument = (docNumber) => {
  return useQuery(
    ['kadastr-certificates', docNumber, 'CERT_NUMBER'],
    getKadastrCertByNumber(docNumber, 'CERT_NUMBER'),
    {
      enabled: Boolean(docNumber),
    }
  );
};

export default useFetchResidenceDocument;
