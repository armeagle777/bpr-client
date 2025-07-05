import { Container } from '@mui/material';

import RegisterHead from '../components/register/RegisterHead';

import RegisterBody from '../components/register/RegisterBody';

const Register = () => {
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const trimedString = searchString.trim();
    //     const searchParamsObj = createSearchParamsObject(trimedString);

    //     setSearchParams(searchParamsObj);

    // };

    return (
        <Container>
            <RegisterHead />
            <RegisterBody />
        </Container>
    );
};

export default Register;
