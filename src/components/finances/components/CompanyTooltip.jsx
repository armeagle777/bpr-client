import InfoIcon from '@mui/icons-material/InfoOutlined';
import { Box, IconButton } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} placement='top-start' classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#0BB5FF',
        color: 'rgba(0, 0, 0, 0.87)',
        // maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '3px solid #fff',
    },
}));

const CompanyTooltip = ({
    name_en,
    name_ru,
    company_type,
    address,
    executive,
}) => {
    return (
        <Box>
            <HtmlTooltip
                title={
                    <>
                        <Typography color='inherit'>
                            {name_en} {company_type}
                        </Typography>
                        <Typography color='inherit'>
                            {name_ru} {company_type}
                        </Typography>
                        <em>{'Տնօրեն։ '}</em>{' '}
                        <b>{executive?.full_name || ''}</b> <em>{'Հասցե։ '}</em>
                        <u>
                            {address?.community} {address?.city_town}{' '}
                            {address?.street1} {address?.house} {address?.apt}
                        </u>
                    </>
                }
            >
                <IconButton
                    color='primary'
                    aria-label='company info'
                    size='small'
                >
                    <InfoIcon fontSize='inherit' />
                </IconButton>
            </HtmlTooltip>
        </Box>
    );
};

export default CompanyTooltip;
