import { Link, Typography } from "@mui/material";

const Copyright = (props) => {
  return (
    <>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://migration.am">
          Միգրացիայի և քաղաքացիության ծառայություն
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Desinged And Developed By "}
        Tigran Yeranyan && Vardan Matevosyan
        {"."}
      </Typography>
    </>
  );
};

export default Copyright;
