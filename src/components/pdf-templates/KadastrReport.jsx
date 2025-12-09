import { Document, Page, Text, View } from '@react-pdf/renderer';

import { financesPdfStyles } from './templates.constants';
import registerPdfFonts from './registerFonts';
import { formatDate } from './templates.helpers';

registerPdfFonts();

const formatCurrency = (value) => {
  if (value === null || value === undefined || value === '') {
    return '---';
  }

  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) {
    return value.toString();
  }

  return `${new Intl.NumberFormat('en-US').format(numericValue)} ֏`;
};

const chunkPairs = (items = [], size = 2) => {
  const result = [];
  for (let i = 0; i < items.length; i += size) {
    const chunk = items.slice(i, i + size);
    while (chunk.length < size) {
      chunk.push(null);
    }
    result.push(chunk);
  }
  return result;
};

const PropertyPairsTable = ({ rows = [] }) => {
  const styles = financesPdfStyles;
  const normalizedRows = rows
    .filter((row) => row && row.label)
    .map((row) => ({
      ...row,
      value:
        row.value === 0 || row.value === '0'
          ? '0'
          : row.value === null || row.value === undefined || row.value === ''
          ? '---'
          : row.value,
    }));

  if (!normalizedRows.length) {
    return null;
  }

  return (
    <View style={styles.table}>
      {chunkPairs(normalizedRows).map((pairRow, rowIndex) => (
        <View key={`pair-row-${rowIndex}`} style={styles.tableRow}>
          {pairRow.map((pair, cellIndex) => (
            <View
              key={`pair-cell-${rowIndex}-${cellIndex}`}
              style={[styles.tableCell, styles.metricCell, styles.pairCell]}
            >
              {pair ? (
                <>
                  <Text style={styles.infoLabel}>{pair.label}</Text>
                  <Text style={styles.infoValue}>{pair.value}</Text>
                </>
              ) : null}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const formatOwner = (owner = {}) => {
  const {
    firstname,
    lastname,
    secondname,
    ssn,
    id_card,
    passport,
    organization_name,
    tax_number,
  } = owner;

  const fullName = [firstname, lastname].filter(Boolean).join(' ');

  if (fullName || ssn) {
    const parts = [fullName].filter(Boolean);
    if (secondname) {
      parts.push(secondname);
    }
    if (ssn) {
      parts.push(`ՀԾՀ ${ssn}`);
    }
    if (id_card) {
      parts.push(`ID ${id_card}`);
    }
    if (passport) {
      parts.push(`Անձնագիր ${passport}`);
    }
    return parts.filter(Boolean).join(' | ');
  }

  if (organization_name) {
    return [organization_name, tax_number ? `ՀՎՀՀ ${tax_number}` : '']
      .filter(Boolean)
      .join(' | ');
  }

  return '';
};

const formatParcel = (parcel = {}) => {
  const parts = Array.isArray(parcel.PARTS) ? parcel.PARTS : [];
  const partsText = parts
    .map((part) => {
      const use = part?.DESIGNATED_USE_TYPE_TITLE;
      const area = part?.LEGAL_AREA;
      if (!use && !area) {
        return null;
      }
      const areaText = area ? `${area} հա` : '';
      return [use, areaText].filter(Boolean).join(' - ');
    })
    .filter(Boolean)
    .join(', ');

  return [parcel.CADASTRAL_CODE, partsText].filter(Boolean).join(' | ');
};

const formatBuilding = (building = {}) => {
  const sections = Array.isArray(building.section) ? building.section : [];
  const sectionDetails = sections
    .map((section) => {
      const descriptors = [
        section?.AREA ? `Մակերես ${section.AREA}մ²` : null,
        section?.FLOOR_NUMBER ? `Հարկ ${section.FLOOR_NUMBER}` : null,
        section?.FLOOR_TITLE,
        section?.COMPLETION_LEVEL ? `Ավարտվածություն ${section.COMPLETION_LEVEL}` : null,
        section?.CONSTRUCTION_YEAR ? `${section.CONSTRUCTION_YEAR} թ.` : null,
      ].filter(Boolean);
      return descriptors.join(' | ');
    })
    .filter(Boolean)
    .join('; ');

  return [
    building.CADASTRAL_CODE,
    building.PURPOSE_OF_USE_TITLE,
    building.TOTAL_AREA ? `Մակերես ${building.TOTAL_AREA}մ²` : '',
    sectionDetails,
  ]
    .filter(Boolean)
    .join(' | ');
};

const formatRightStatus = (status) => {
  if (!status) {
    return '---';
  }
  return status === '1' ? 'ակտուալ' : 'դադարած';
};

const PropertySection = ({ property, index }) => {
  const styles = financesPdfStyles;
  const rights = Array.isArray(property?.RIGHTS) ? property.RIGHTS : [];

  const locationRows = [
    { label: 'Մարզ', value: property?.REGION },
    { label: 'Համայնք', value: property?.COMMUNITY },
    {
      label: 'Փողոց',
      value: property?.STREET_NAME || property?.STREET_TYPE ? `${property?.STREET_NAME || ''} ${property?.STREET_TYPE || ''}`.trim() : property?.ADDRESS_DESCRIPTION,
    },
    { label: 'Շենք', value: property?.BUILDING },
    { label: 'Տուն', value: property?.HOUSE },
    { label: 'Կադաստրային կոդ', value: property?.UNIT_ID },
  ];

  const detailsRows = [
    { label: 'Հասցե', value: property?.UNIT_ADDRESS },
    { label: 'Նպատակային նշանակություն', value: property?.PURPOSE_OF_THE_BUILDING },
    { label: 'Տարածագնահատման գոտի', value: property?.EVALUATION_ZONE },
    { label: 'Զբաղեցված մակերես (շին.)', value: property?.BLD_AREA },
    { label: 'Զբաղեցված մակերես (հող.)', value: property?.PPRCL_AREA },
  ];

  const valueRows = [
    { label: 'Հողամասի կադաստրային արժեք', value: formatCurrency(property?.PARCEL_CADASTRAL_VALUE) },
    { label: 'Շենքի կադաստրային արժեք', value: formatCurrency(property?.BUILDING_CADASTRAL_VALUE) },
  ];

  return (
    <View key={`property-${index}`} style={styles.employerSection}>
      <View style={styles.employerHeader}>
        <Text style={styles.employerTitle}>Անշարժ գույք {property?.UNIT_ID || ''}</Text>
        {property?.UNIT_ADDRESS && (
          <Text style={styles.employerMeta}>{property.UNIT_ADDRESS}</Text>
        )}
      </View>
      <View style={styles.propertySectionContent}>
        <Text style={styles.sectionHeading}>Գտնվելու վայրը</Text>
        <PropertyPairsTable rows={locationRows} />

        <Text style={styles.sectionHeading}>Գույքի մանրամասներ</Text>
        <PropertyPairsTable rows={detailsRows} />

        <Text style={styles.sectionHeading}>Կադաստրային արժեքներ</Text>
        <PropertyPairsTable rows={valueRows} />

        <Text style={styles.sectionHeading}>Գույքի նկատմամբ իրավունքներ</Text>
        {rights.length ? (
          rights.map((right, rightIndex) => {
            const subjects = Array.isArray(right.SUBJECTS) ? right.SUBJECTS : [];
            const parcels = Array.isArray(right.PARCELS) ? right.PARCELS : [];
            const buildings = Array.isArray(right.BUILDINGS) ? right.BUILDINGS : [];

            const rightRows = [
              { label: 'Վկայական', value: right?.CERTIFICATE_NUMBER },
              { label: 'Իրավունքի տեսակ', value: right?.RIGHT_TYPE },
              { label: 'Գրանցման ա/թ', value: right?.REG_DATE },
              { label: 'Իրավունքի կարգավիճակ', value: formatRightStatus(right?.RIGHT_TERM_TYPE) },
              { label: 'Դադարեցման ա/թ', value: right?.RIGHT_TERM_DATE },
              { label: 'Շինությունների մակերեսը', value: right?.BLD_AREA },
              { label: 'Հողի մակերեսը', value: right?.PPRCL_AREA },
              {
                label: 'Սուբյեկտներ',
                value: subjects
                  .map((subject) => formatOwner(subject))
                  .filter(Boolean)
                  .join('; '),
              },
              {
                label: 'Հողամասեր',
                value: parcels
                  .map((parcel) => formatParcel(parcel))
                  .filter(Boolean)
                  .join('; '),
              },
              {
                label: 'Շինություններ',
                value: buildings
                  .map((building) => formatBuilding(building))
                  .filter(Boolean)
                  .join('; '),
              },
            ];

            return (
              <View key={`right-${rightIndex}`} wrap={false}>
                <Text style={styles.totalText}>Իրավունք #{rightIndex + 1}</Text>
                <PropertyPairsTable rows={rightRows} />
              </View>
            );
          })
        ) : (
          <Text style={styles.emptyRow}>Իրավունքներ հասանելի չեն</Text>
        )}
      </View>
    </View>
  );
};

const KadastrReport = ({ data = {}, userFullName }) => {
  const styles = financesPdfStyles;
  const { PNum, properties } = data || {};
  const reportData = Array.isArray(properties) ? properties : [];
  const generatedAt = formatDate(new Date());
  const exporterName = (userFullName || '').trim() || '---';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Անշարժ գույքի գրանցումներ</Text>
          {PNum && <Text style={styles.subtitle}>ՀԾՀ {PNum}</Text>}
          <Text style={styles.meta}>Ստեղծված՝ {generatedAt}</Text>
          <Text style={styles.meta}>Արտահանող՝ {exporterName}</Text>
        </View>
        <View style={styles.content}>
          {reportData.length ? (
            reportData.map((property, index) => (
              <PropertySection key={`property-section-${index}`} property={property} index={index} />
            ))
          ) : (
            <Text style={styles.emptyState}>Տվյալներ հասանելի չեն</Text>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default KadastrReport;
