import { Document, Page, Text, View } from '@react-pdf/renderer';

import { financesPdfStyles } from './templates.constants';
import registerPdfFonts from './registerFonts';
import { formatDate } from './templates.helpers';

registerPdfFonts();

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

const InfoPairsTable = ({ rows = [] }) => {
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

const formatAmountValue = (value) => {
  if (value === null || value === undefined || value === '') {
    return '---';
  }
  const numeric = Number(value);
  if (Number.isNaN(numeric)) {
    return value;
  }
  return new Intl.NumberFormat('en-US').format(numeric);
};

const TaxesTable = ({ columns = [], rows = [] }) => {
  const styles = financesPdfStyles;
  if (!rows.length) {
    return null;
  }

  return (
    <View style={styles.table}>
      <View style={[styles.tableRow, styles.tableHeaderRow]}>
        {columns.map((column, index) => (
          <View
            key={`col-${index}`}
            style={[
              styles.tableCell,
              styles.metricCell,
              index === columns.length - 1 && styles.lastCell,
            ]}
          >
            <Text style={[styles.headerText, styles.cellText]}>{column}</Text>
          </View>
        ))}
      </View>
      {rows.map((row, rowIndex) => (
        <View key={`tax-row-${rowIndex}`} style={styles.tableRow}>
          {row.map((cell, cellIndex) => (
            <View
              key={`cell-${rowIndex}-${cellIndex}`}
              style={[
                styles.tableCell,
                styles.metricCell,
                cellIndex === row.length - 1 && styles.lastCell,
              ]}
            >
              <Text style={styles.cellText}>{cell || '---'}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const RealEstateCard = ({ item, personType }) => {
  const styles = financesPdfStyles;
  const isPhysical = personType === 'PHYSICAL';
  const service = isPhysical ? item?.physical_real_estate_service : item?.legal_real_estate_service;
  const persons = isPhysical
    ? item?.physical_real_estate_persons || []
    : item?.legal_real_estate_persons || [];

  if (!service) {
    return null;
  }

  const generalRows = [
    { label: 'Գույքի տեսակ', value: service?.property_type },
    { label: 'Կադաստրային ծածկագիր', value: service?.property_cadaster_password },
    !isPhysical && { label: 'Հողի կադաստրային ծածկագիր', value: service?.land_cadaster_password },
    !isPhysical && { label: 'Հողի օգտագործման նպատակ', value: service?.land_type },
    { label: 'Սկիզբ', value: service?.start_date },
  ].filter(Boolean);

  return (
    <View style={styles.employerSection}>
      <View style={styles.employerHeader}>
        <Text style={styles.employerTitle}>Անշարժ գույք</Text>
        {service?.property_type && <Text style={styles.employerMeta}>{service.property_type}</Text>}
      </View>
      <View style={styles.propertySectionContent}>
        <Text style={styles.sectionHeading}>Ընդհանուր տվյալներ</Text>
        <InfoPairsTable rows={generalRows} />

        {persons.map((person, index) => {
          const personRows = isPhysical
            ? [
                {
                  label: 'Սեփականատեր',
                  value: `${person?.mta_get_taxes_last_name || ''} ${
                    person?.mta_get_taxes_first_name || ''
                  }`.trim(),
                },
              ]
            : [
                { label: 'Կազմակերպություն', value: person?.organization_name },
                { label: 'ՀՎՀՀ', value: person?.tax_id },
                { label: 'Գրանցման համար', value: person?.reg_num },
                { label: 'Սեփականատիրոջ տեսակ', value: person?.person_type },
                { label: 'Վճարման հաշվեհամար', value: person?.account_number },
                { label: 'Վճարման ամսաթիվ', value: person?.calculation_date },
                person?.share ? { label: 'Բաժին', value: person.share } : null,
              ].filter(Boolean);

          const taxes = (isPhysical ? person?.physical_real_estate_taxes : person?.legal_real_estate_taxes) || [];
          const columns = isPhysical
            ? ['Տարի', 'Հարկ (֏)', 'Տուգանք (֏)', 'Պարտք (֏)']
            : ['Տարի', 'Հարկ (֏)', 'Գույքահարկի պարտք (֏)', 'Տույժ (֏)', 'Տույժի պարտք (֏)', 'Գերավճար (֏)'];

          const rows = taxes.map((tax) =>
            isPhysical
              ? [
                  tax?.year,
                  formatAmountValue(tax?.physical_real_estate_tax_item?.amount),
                  formatAmountValue(tax?.physical_real_estate_penalty?.amount),
                  formatAmountValue(tax?.physical_real_estate_tax_item?.debt),
                ]
              : [
                  tax?.year,
                  formatAmountValue(tax?.legal_real_estate_tax_item?.amount),
                  formatAmountValue(tax?.legal_real_estate_tax_item?.debt),
                  formatAmountValue(tax?.legal_real_estate_penalty?.amount),
                  formatAmountValue(tax?.legal_real_estate_penalty?.debt),
                  formatAmountValue(tax?.overpay),
                ]
          );

          return (
            <View key={`property-person-${index}`}>
              <Text style={styles.sectionHeading}>Սեփականատեր #{index + 1}</Text>
              <InfoPairsTable rows={personRows} />
              <TaxesTable columns={columns} rows={rows} />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const VehicleCard = ({ item, personType }) => {
  const styles = financesPdfStyles;
  const isPhysical = personType === 'PHYSICAL';
  const service = isPhysical ? item?.physical_vehicles_service : item?.legal_vehicles_service;
  const persons = isPhysical
    ? item?.physical_vehicles_persons || []
    : item?.legal_vehicles_persons || [];

  if (!service) {
    return null;
  }

  const generalRows = [
    { label: 'Մոդել', value: service?.make },
    { label: 'Տեսակ', value: service?.type },
    { label: 'Համարանիշ', value: service?.vehicle_number },
    { label: 'Արտադրված', value: service?.released },
    { label: 'Սկիզբ', value: service?.start_date },
    { label: 'Շարժիչի հզորություն', value: service?.engine_hp },
    { label: 'Վկայական', value: service?.cert_num },
  ];

  return (
    <View style={styles.employerSection}>
      <View style={styles.employerHeader}>
        <Text style={styles.employerTitle}>Շարժական գույք</Text>
        {service?.vehicle_number && <Text style={styles.employerMeta}>{service.vehicle_number}</Text>}
      </View>
      <View style={styles.propertySectionContent}>
        <InfoPairsTable rows={generalRows} />

        {persons.map((person, index) => {
          const personRows = isPhysical
            ? [
                {
                  label: 'Սեփականատեր',
                  value: `${person?.mta_get_taxes_last_name || ''} ${
                    person?.mta_get_taxes_first_name || ''
                  }`.trim(),
                },
              ]
            : [
                { label: 'Կազմակերպություն', value: person?.organization_name },
                { label: 'Գրանցման թիվ', value: person?.reg_num },
                { label: 'Բաժին', value: person?.share },
              ];

          const taxes = (isPhysical ? person?.physical_vehicles_taxes : person?.legal_vehicles_taxes) || [];
          const columns = ['Տարի', 'Հարկ (֏)', 'Պարտք (֏)'];
          const rows = taxes.map((tax) => [
            tax?.year,
            formatAmountValue(
              (isPhysical ? tax?.physical_vehicles_tax_item : tax?.legal_vehicles_tax_item)?.amount
            ),
            formatAmountValue(
              (isPhysical ? tax?.physical_vehicles_tax_item : tax?.legal_vehicles_tax_item)?.debt
            ),
          ]);

          return (
            <View key={`vehicle-person-${index}`}>
              <Text style={styles.sectionHeading}>Սեփականատեր #{index + 1}</Text>
              <InfoPairsTable rows={personRows} />
              <TaxesTable columns={columns} rows={rows} />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const PropertyTaxesReport = ({ data = {}, userFullName }) => {
  const styles = financesPdfStyles;
  const { identificator, personType = 'PHYSICAL', realEstate = [], vehicles = [] } = data || {};
  const generatedAt = formatDate(new Date());
  const exporterName = (userFullName || '').trim() || '---';
  const hasData = realEstate.length > 0 || vehicles.length > 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Գույքահարկ</Text>
          {identificator && <Text style={styles.subtitle}>Նույնականացուցիչ {identificator}</Text>}
          <Text style={styles.meta}>Ստեղծված՝ {generatedAt}</Text>
          <Text style={styles.meta}>Արտահանող՝ {exporterName}</Text>
        </View>
        <View style={styles.content}>
          {hasData ? (
            <>
              {realEstate.map((item, index) => (
                <RealEstateCard key={`real-${index}`} item={item} personType={personType} />
              ))}
              {vehicles.map((item, index) => (
                <VehicleCard key={`vehicle-${index}`} item={item} personType={personType} />
              ))}
            </>
          ) : (
            <Text style={styles.emptyState}>Տվյալներ հասանելի չեն</Text>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default PropertyTaxesReport;
