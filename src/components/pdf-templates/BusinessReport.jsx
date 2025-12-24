import { Document, Page, Text, View } from '@react-pdf/renderer';

import { businessPdfStyles } from './templates.constants';
import registerPdfFonts from './registerFonts';
import { formatDate } from './templates.helpers';
import { activityCodes } from '../../utils/industryCodes';

registerPdfFonts();

const getCompanyDisplayName = (company = {}) => {
  const names = [company.name_am, company.name_en, company.name_ru]
    .filter(Boolean)
    .join(' | ');
  return names || company.company_type || 'Չսահմանված ընկերություն';
};

const getDirector = (company = {}) => {
  if (company.executive) {
    return company.executive;
  }
  if (company.sole_proprietor) {
    return company.sole_proprietor;
  }
  return {};
};

const formatPhone = (phone) => {
  if (!phone) {
    return '---';
  }
  const value = phone.toString().trim();
  if (!value) {
    return '---';
  }
  return value.startsWith('0') ? value : `0${value}`;
};

const getIndustryName = (industryCode) => {
  if (!industryCode) {
    return '---';
  }
  return activityCodes[industryCode] || industryCode;
};

const InfoRow = ({ label, value }) => {
  const styles = businessPdfStyles;
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value || '---'}</Text>
    </View>
  );
};

const BusinessReport = ({ data = {}, userFullName }) => {
  const styles = businessPdfStyles;
  const { PNum, companies } = data || {};
  const reportData = Array.isArray(companies) ? companies : [];
  const generatedAt = formatDate(new Date());
  const exporterName = (userFullName || '').trim() || '---';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Գրանցված ընկերություններ</Text>
          {PNum && <Text style={styles.subtitle}>ՀԾՀ {PNum}</Text>}
          <Text style={styles.meta}>Ստեղծված՝ {generatedAt}</Text>
          <Text style={styles.meta}>Արտահանող՝ {exporterName}</Text>
        </View>
        <View style={styles.content}>
          {reportData.length ? (
            reportData.map((company, index) => {
              const director = getDirector(company);
              const directorAddress = director?.address || {};
              const companyAddress = company?.address || {};
              const key = company?.reg_num || company?.taxid || index;

              return (
                <View key={key} style={styles.companyCard}>
                  <View style={styles.companyHeader}>
                    <Text style={styles.companyTitle}>{getCompanyDisplayName(company)}</Text>
                    <Text style={styles.companyMeta}>
                      {company?.company_type || 'Չսահմանված տեսակ'}
                      {company?.cert_num ? ` · Վկայական ${company.cert_num}` : ''}
                    </Text>
                    {(company?.taxid || company?.reg_num) && (
                      <Text style={styles.companySubMeta}>
                        {company?.taxid ? `ՀՎՀՀ ${company.taxid}` : ''}
                        {company?.reg_num ? `${company?.taxid ? ' · ' : ''}Գրանց. համար ${company.reg_num}` : ''}
                      </Text>
                    )}
                  </View>
                  <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>Ընդհանուր տվյալներ</Text>
                    <View style={styles.infoRows}>
                      <InfoRow label="Ոլորտ" value={getIndustryName(company?.industry_code)} />
                      <InfoRow label="Հասցե" value={companyAddress?.addr_descr} />
                      <InfoRow label="Հեռախոս" value={formatPhone(companyAddress?.phone)} />
                    </View>

                    <Text style={styles.sectionTitle}>Պատասխանատու անձ</Text>
                    <View style={styles.infoRows}>
                      <InfoRow label="Անուն Ազգանուն" value={director?.full_name} />
                      <InfoRow label="Նույնականացման համար" value={director?.identification_no} />
                      <InfoRow label="Հասցե" value={directorAddress?.addr_descr} />
                      <InfoRow label="Հեռախոս" value={formatPhone(directorAddress?.phone)} />
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
            <Text style={styles.emptyState}>Տվյալներ հասանելի չեն</Text>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default BusinessReport;
