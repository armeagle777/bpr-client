import { useQuery } from '@tanstack/react-query';

import { getKadastrCertByNumber } from '../api/personsApi';
import { SEARCH_BASES } from '../pages/KadastrCertificate/KadastrCertificate.constants';

const useFetchResidenceDocument = (docNumber, queryOptions) => {
  return useQuery(
    ['kadastr-certificates', docNumber, SEARCH_BASES['CERT_NUMBER']],
    () => getKadastrCertByNumber(docNumber, SEARCH_BASES['CERT_NUMBER']),
    {
      enabled: queryOptions.enabled,
    }
  );
};

export default useFetchResidenceDocument;
