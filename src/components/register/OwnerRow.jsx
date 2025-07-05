import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const OwnerRow = ({ ownerInfo }) => {
    const {
        address: { addr_descr, email, mobile, phone, website },
        full_name = '',
        id_info: { birth_date, sex, ssn, taxid, passport_no },
        is_founder,
        is_legal_entity,
        joined_date,
        left_date,
        shares,
        share_info,
    } = { ...ownerInfo };
    return (
        <List
            sx={{
                width: '100%',
                bgcolor: 'background.paper',
            }}
        >
            <ListItem alignItems='flex-start'>
                {
                    <ListItemAvatar>
                        <Avatar
                            alt={full_name}
                            src={
                                sex === 'Ի'
                                    ? '/female.png'
                                    : sex === 'Ա'
                                    ? '/male.png'
                                    : ''
                            }
                        >
                            {is_legal_entity && 'C'}
                        </Avatar>
                    </ListItemAvatar>
                }
                <ListItemText
                    primary={full_name}
                    secondary={
                        <Stack direction='row'>
                            <Typography
                                variant='body2'
                                color='text.primary'
                                align='right'
                                fontWeight={700}
                            >
                                Հասցե {' - '} <br />
                                Էլ․ փոստ {' - '} <br />
                                Հեռախոս {' - '}
                                <br />
                                Անձնագիր {' - '} <br />
                                Ծննդ․ ա/թ {' - '}
                            </Typography>
                            <Typography
                                variant='secondary'
                                color='text.primary'
                                sx={{ pl: 1 }}
                                flexGrow={2}
                            >
                                {addr_descr} <br />
                                {email} <br />
                                {mobile || phone} <br />
                                {passport_no} <br />
                                {birth_date}
                            </Typography>
                            <Typography
                                variant='body2'
                                color='text.primary'
                                align='right'
                                flexGrow={1}
                                fontWeight={700}
                            >
                                Հիմնադիր է {' - '} <br />
                                Միանալու ա/թ {' - '} <br />
                                Հեռանալու ա/թ {' - '} <br />
                                Բաժնեմաս {' - '} <br />
                                {is_legal_entity ? 'ՀՎՀՀ - ' : 'ՀԾՀ - '}
                            </Typography>
                            <Typography
                                variant='secondary'
                                color='text.primary'
                                sx={{ pl: 1 }}
                                flexGrow={2}
                            >
                                <span
                                    style={{
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '50%',
                                        backgroundColor: !is_founder
                                            ? 'red'
                                            : 'green',
                                        display: 'inline-block',
                                    }}
                                ></span>{' '}
                                <br />
                                {joined_date} <br />
                                {left_date} <br />
                                {shares} <br />
                                {is_legal_entity ? taxid : ssn}
                            </Typography>
                        </Stack>
                    }
                />
            </ListItem>
        </List>
    );
};

export default OwnerRow;
