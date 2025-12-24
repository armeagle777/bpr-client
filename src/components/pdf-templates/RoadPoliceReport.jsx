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

const formatDateString = (value) => {
  if (!value) {
    return '';
  }
  const sanitized = value.split('T')[0];
  const [year, month, dayWithTime] = sanitized.split('-');
  if (!year || !month || !dayWithTime) {
    return value;
  }
  const day = dayWithTime.split(' ')[0];
  return `${day}/${month}/${year}`;
};

const statusesMap = {
  1: 'Ուժը կորցրած',
  2: 'Ժամկետանց',
  3: 'Կասեցված',
};

const mapBlockType = (type) => {
  if (type === 'block') {
    return 'Արգելանք';
  }
  if (type === 'search') {
    return 'Հետախուզում';
  }
  return type || '';
};

const formatHolder = (holder = {}) => {
  const name = [holder.first_name, holder.patronic_name, holder.last_name]
    .filter(Boolean)
    .join(' ')
    .trim();
  const details = [
    name,
    holder.psn ? `ՀԾՀ ${holder.psn}` : null,
    holder.rp_entity_identification_number
      ? `Փաստաթուղթ ${holder.rp_entity_identification_number}`
      : null,
    holder.birth_date ? `Ծննդյան տարեթիվ ${holder.birth_date}` : null,
    holder.gender ? `Սեռ ${holder.gender}` : null,
    holder.br_nationality_country_code_a2 ? `Քաղաքացիություն ${holder.br_nationality_country_code_a2}` : null,
  ].filter(Boolean);

  const phone =
    holder?.rp_vehicle_holder_address?.br_mobile || holder?.rp_vehicle_holder_address?.br_phone;
  if (phone) {
    details.push(`Հեռախոս ${phone}`);
  }

  const addressParts = [
    holder?.rp_vehicle_holder_address?.br_address_line_1,
    holder?.rp_vehicle_holder_address?.building_type,
    holder?.rp_vehicle_holder_address?.building,
    holder?.rp_vehicle_holder_address?.apartment
      ? `բն. ${holder.rp_vehicle_holder_address.apartment}`
      : null,
    holder?.rp_vehicle_holder_address?.community,
    holder?.rp_vehicle_holder_address?.region,
  ].filter(Boolean);

  if (addressParts.length) {
    details.push(`Հասցե ${addressParts.join(', ')}`);
  }

  return details.join(' | ');
};

const formatLender = (lender = {}) => {
  const name = [lender.first_name, lender.middle_name, lender.last_name, lender.organization_name]
    .filter(Boolean)
    .join(' ');
  const parts = [
    lender.is_legal_entity ? 'Իրավաբանական անձ' : 'Ֆիզիկական անձ',
    name,
    lender.identification_no ? `Փաստաթուղթ ${lender.identification_no}` : null,
    lender.address?.mobile || lender.address?.phone
      ? `Հեռ. ${lender.address?.mobile || lender.address?.phone}`
      : null,
    lender.address?.street1
      ? `Հասցե ${[
          lender.address.street1,
          lender.address.house_type,
          lender.address.house,
          lender.address.apt,
          lender.address.city_town,
          lender.address.province,
          lender.address.postcode,
        ]
          .filter(Boolean)
          .join(', ')}`
      : null,
    lender.shares ? `Գրավ ${lender.shares} ${lender.currency || '֏'}` : null,
    lender.place ? `Վայր ${lender.place}` : null,
    lender.allowed_lending === true ? 'Թույլատր. վերագրավում' : null,
  ].filter(Boolean);

  return parts.join(' | ');
};

const formatBlock = (block = {}) => {
  const parts = [
    block.reg_num ? `Գրանցման համար ${block.reg_num}` : null,
    block.block_date ? `Ամսաթիվ ${block.block_date}` : null,
    block.block_type ? `Տեսակ ${mapBlockType(block.block_type)}` : null,
    block.block_institution ? `Կազմակերպություն ${block.block_institution}` : null,
    block.block_reason ? `Պատճառ ${block.block_reason}` : null,
  ].filter(Boolean);

  return parts.join(' | ');
};

const LicenseSection = ({ license }) => {
  if (!license || !Object.keys(license).length) {
    return null;
  }

  const styles = financesPdfStyles;
  const classInfo = Array.isArray(license?.cllass_info)
    ? license.cllass_info.map((info) => {
        const formattedDate = formatDateString(info?.added);
        return [info?.class, formattedDate].filter(Boolean).join(' - ');
      })
    : [];

  const licenseRows = [
    { label: 'Վկայականի համար', value: license?.reg_num },
    { label: 'Դասեր', value: license?.classes },
    {
      label: 'Վերաթողարկման ա/թ',
      value: formatDateString(license?.released),
    },
    {
      label: 'Կարգավիճակ',
      value: statusesMap?.[license?.denied] || (license?.denied ? license?.denied : ''),
    },
    {
      label: 'Վարորդական իրավունք',
      value: license?.inactive === 1 ? 'Զրկված' : 'Ակտիվ',
    },
    { label: 'Քարտապան', value: license?.person?.full_name || license?.full_name_en },
  ];

  return (
    <View style={styles.employerSection}>
      <View style={styles.employerHeader}>
        <Text style={styles.employerTitle}>Վարորդական վկայական</Text>
        {license?.full_name_en && <Text style={styles.employerMeta}>{license.full_name_en}</Text>}
      </View>
      <View style={styles.propertySectionContent}>
        <Text style={styles.sectionHeading}>Ընդհանուր տվյալներ</Text>
        <InfoPairsTable rows={licenseRows} />
        {classInfo.length > 0 && (
          <>
            <Text style={styles.sectionHeading}>Դասեր և ստացման ա/թ</Text>
            <View style={styles.list}>
              {classInfo.map((info, index) => (
                <Text key={`class-${index}`} style={styles.listItem}>
                  {info}
                </Text>
              ))}
            </View>
          </>
        )}
        {license?.inactive === 1 && <Text style={styles.badge}>Զրկված վարորդական իրավունքից</Text>}
      </View>
    </View>
  );
};

const VehicleSection = ({ vehicle, index }) => {
  const styles = financesPdfStyles;
  const holder =
    vehicle?.rp_vehicle_holder ||
    vehicle?.rp_vehicle_owners?.find((owner) => owner?.rp_is_holder === true);
  const otherOwners = Array.isArray(vehicle?.rp_vehicle_owners)
    ? vehicle.rp_vehicle_owners.filter((owner) => owner?.rp_is_holder !== true)
    : [];
  const lenders = Array.isArray(vehicle?.lenders) ? vehicle.lenders : [];
  const blocks = Array.isArray(vehicle?.blockData) ? vehicle.blockData : [];

  const vehicleRows = [
    {
      label: 'Մոդել / Տիպ',
      value: [vehicle?.model_name, vehicle?.vehicle_model].filter(Boolean).join(' - '),
    },
    {
      label: 'Վկայական',
      value: vehicle?.cert_num || vehicle?.vehicle_registration_certificate_number,
    },
    { label: 'Կարգավիճակ', value: vehicle?.vehicle_registration_status },
    { label: 'Հաշվառման համարանիշ', value: vehicle?.vehicle_number },
    { label: 'VIN', value: vehicle?.vehicle_vin },
    { label: 'Թողարկման տարեթիվ', value: vehicle?.vehicle_release_date },
    { label: 'Տրված է', value: vehicle?.vehicle_recording_date },
    {
      label: 'Շարժիչի հզորություն',
      value:
        vehicle?.vehicle_engine_power || vehicle?.vehicle_engine_hp
          ? `${vehicle?.vehicle_engine_power || ''} kW / ${vehicle?.vehicle_engine_hp || ''} HP`
          : '',
    },
    {
      label: 'Վառելիք',
      value:
        vehicle?.fuel || vehicle?.vehicle_fuel_type
          ? [vehicle?.fuel, vehicle?.vehicle_fuel_type].filter(Boolean).join(' ')
          : '',
    },
    {
      label: 'Թափք',
      value: [vehicle?.vehicle_type, vehicle?.vehicle_body_type].filter(Boolean).join(' / '),
    },
    { label: 'Գույն', value: vehicle?.vehicle_color },
    { label: 'Քաշ', value: vehicle?.vehicle_weight },
    { label: 'Առավելագույն քաշ', value: vehicle?.vehicle_max_weight },
    { label: 'Տրանզիտային համարանիշ', value: vehicle?.vehicle_transit_number },
    { label: 'Ժամանակավոր համարանիշ', value: vehicle?.vehicle_temporary_number },
    { label: 'Սեփականության վկ.', value: vehicle?.owner_cert_id },
    { label: 'Հատուկ նշումներ', value: vehicle?.vehicle_special_notes },
  ];

  const insuranceRows = [
    {
      label: 'ԱՊՊԱ ընկերություն',
      value: vehicle?.rp_vehicle_insurance_details?.vehicle_insurance_company,
    },
    {
      label: 'ԱՊՊԱ վավերություն',
      value:
        vehicle?.rp_vehicle_insurance_details?.vehicle_insurance_start_date ||
        vehicle?.rp_vehicle_insurance_details?.vehicle_insurance_end_date
          ? `${vehicle?.rp_vehicle_insurance_details?.vehicle_insurance_start_date || ''} - ${
              vehicle?.rp_vehicle_insurance_details?.vehicle_insurance_end_date || ''
            }`
          : '',
    },
  ];

  const ownersList = [];
  if (holder) {
    ownersList.push(`Սեփականատեր - ${formatHolder(holder)}`);
  }
  otherOwners.forEach((owner, idx) => {
    ownersList.push(`Հատ. սեփականատեր ${idx + 1} - ${formatHolder(owner)}`);
  });

  return (
    <View key={`vehicle-${index}`} style={styles.employerSection}>
      <View style={styles.employerHeader}>
        <Text style={styles.employerTitle}>
          Տրանսպորտային միջոց {vehicle?.vehicle_number || vehicle?.model_name || ''}
        </Text>
        {vehicle?.vehicle_registration_status && (
          <Text style={styles.employerMeta}>{vehicle.vehicle_registration_status}</Text>
        )}
      </View>
      <View style={styles.propertySectionContent}>
        <Text style={styles.sectionHeading}>Տրանսպորտային միջոցի տվյալներ</Text>
        <InfoPairsTable rows={vehicleRows} />

        <Text style={styles.sectionHeading}>ԱՊՊԱ</Text>
        <InfoPairsTable rows={insuranceRows} />

        <Text style={styles.sectionHeading}>Սեփականատերեր</Text>
        {ownersList.length ? (
          <View style={styles.list}>
            {ownersList.map((owner, ownerIndex) => (
              <Text key={`owner-${ownerIndex}`} style={styles.listItem}>
                {owner}
              </Text>
            ))}
          </View>
        ) : (
          <Text style={styles.emptyRow}>Սեփականատերերի տվյալներ չկան</Text>
        )}

        {lenders.length > 0 && (
          <>
            <Text style={styles.sectionHeading}>Գրավառուներ</Text>
            <View style={styles.list}>
              {lenders.map((lender, lenderIndex) => (
                <Text key={`lender-${lenderIndex}`} style={styles.listItem}>
                  {formatLender(lender)}
                </Text>
              ))}
            </View>
          </>
        )}

        {blocks.length > 0 && (
          <>
            <Text style={styles.sectionHeading}>Կիրառված սահմանափակումներ</Text>
            <View style={styles.list}>
              {blocks.map((block, blockIndex) => (
                <Text key={`block-${blockIndex}`} style={styles.listItem}>
                  {formatBlock(block)}
                </Text>
              ))}
            </View>
          </>
        )}

        {(vehicle?.inactive || vehicle?.is_blocked) && (
          <View style={styles.list}>
            {vehicle?.inactive ? (
              <Text style={styles.badge}>Հաշվառումից հանված</Text>
            ) : null}
            {vehicle?.is_blocked ? (
              <Text style={styles.badge}>Կիրառված սահմանափակումներ</Text>
            ) : null}
          </View>
        )}
      </View>
    </View>
  );
};

const RoadPoliceReport = ({ data = {}, userFullName }) => {
  const styles = financesPdfStyles;
  const { PNum, license, vehicles } = data || {};
  const reportVehicles = Array.isArray(vehicles) ? vehicles : [];
  const hasLicense = license && Object.keys(license).length > 0;
  const hasVehicles = reportVehicles.length > 0;
  const generatedAt = formatDate(new Date());
  const exporterName = (userFullName || '').trim() || '---';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>ՃՈ տվյալներ</Text>
          {PNum && <Text style={styles.subtitle}>ՀԾՀ {PNum}</Text>}
          <Text style={styles.meta}>Ստեղծված՝ {generatedAt}</Text>
          <Text style={styles.meta}>Արտահանող՝ {exporterName}</Text>
        </View>
        <View style={styles.content}>
          {hasLicense && <LicenseSection license={license} />}
          {hasVehicles &&
            reportVehicles.map((vehicle, index) => (
              <VehicleSection key={`vehicle-section-${index}`} vehicle={vehicle} index={index} />
            ))}
          {!hasLicense && !hasVehicles && (
            <Text style={styles.emptyState}>Տվյալներ հասանելի չեն</Text>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default RoadPoliceReport;
