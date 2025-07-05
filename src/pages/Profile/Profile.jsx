import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import LockIcon from "@mui/icons-material/Lock";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import useProfileData from "../../hooks/useProfileData";

const Profile = () => {
  const user = useAuthUser();
  const {
    password,
    canSubmit,
    setPassword,
    newPassword,
    setNewPassword,
    approvedPassword,
    changePwdLoading,
    onChangePwdSubmit,
    resetPasswordFields,
    setApprovedPassword,
  } = useProfileData();

  const { Role, email, firstName, lastName } = user;

  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      <Box
        sx={{
          // position: "sticky",
          top: { sm: -100, md: -110 },
          bgcolor: "background.body",
          zIndex: 9995,
        }}
      >
        <Box sx={{ px: { xs: 2, md: 6 } }}>
          <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
            Անձնական էջ
          </Typography>
        </Box>
        <Tabs defaultValue={0} sx={{ bgcolor: "transparent" }}>
          <TabList
            tabFlex={1}
            size="sm"
            sx={{
              pl: { xs: 0, md: 4 },
              justifyContent: "left",
              [`&& .${tabClasses.root}`]: {
                fontWeight: "600",
                flex: "initial",
                color: "text.tertiary",
                [`&.${tabClasses.selected}`]: {
                  bgcolor: "transparent",
                  color: "text.primary",
                  "&::after": {
                    height: "2px",
                    bgcolor: "primary.500",
                  },
                },
              },
            }}
          >
            <Tab sx={{ borderRadius: "6px 6px 0 0" }} indicatorInset value={0}>
              Կարգաբերումներ
            </Tab>
            {/* <Tab sx={{ borderRadius: "6px 6px 0 0" }} indicatorInset value={1}>
              Team
            </Tab>
            <Tab sx={{ borderRadius: "6px 6px 0 0" }} indicatorInset value={2}>
              Plan
            </Tab>
            <Tab sx={{ borderRadius: "6px 6px 0 0" }} indicatorInset value={3}>
              Billing
            </Tab> */}
          </TabList>
        </Tabs>
      </Box>
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "800px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Անձնական տվյալներ</Typography>
            <Typography level="body-sm">
              Անձնական տվյալների խմբագրման դաշտը դեռ հասանելի չէ.
            </Typography>
          </Box>
          <Divider />
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
          >
            <Stack direction="column" spacing={1}>
              <AspectRatio
                ratio="1"
                maxHeight={200}
                sx={{ flex: 1, minWidth: 120, borderRadius: "100%" }}
              >
                <img src="" srcSet="" loading="lazy" alt="" />
              </AspectRatio>
              <IconButton
                aria-label="upload new picture"
                size="sm"
                variant="outlined"
                color="neutral"
                sx={{
                  bgcolor: "background.body",
                  position: "absolute",
                  zIndex: 2,
                  borderRadius: "50%",
                  left: 100,
                  top: 170,
                  boxShadow: "sm",
                }}
              >
                <EditRoundedIcon />
              </IconButton>
            </Stack>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>Անուն</FormLabel>
                <FormControl
                  sx={{
                    display: { sm: "flex-column", md: "flex-row" },
                    gap: 2,
                  }}
                >
                  <Input size="sm" placeholder="Անուն" value={firstName} />
                  <Input
                    size="sm"
                    placeholder="Ազգանուն"
                    sx={{ flexGrow: 1 }}
                    value={lastName}
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Input size="sm" defaultValue="UI Developer" value={Role} />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>էլ. հասցե</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    startDecorator={<EmailRoundedIcon />}
                    placeholder="էլ. հասցե"
                    sx={{ flexGrow: 1 }}
                    value={email}
                  />
                </FormControl>
              </Stack>
              <FormControl sx={{ flexGrow: 1 }}>
                <FormLabel>Հեռ.</FormLabel>
                <Input
                  size="sm"
                  startDecorator={<LocalPhoneIcon />}
                  placeholder="Հեռախոս"
                  sx={{ flexGrow: 1 }}
                  value=""
                />
              </FormControl>
            </Stack>
          </Stack>
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral" disabled>
                Փակել
              </Button>
              <Button size="sm" variant="solid" disabled>
                Պահպանել
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Գաղտնաբառ</Typography>
            <Typography level="body-sm">
              Գաղտնաբառի փոփոխության համար անհրաժեշտ է լրացնել հին գաղնաբառը։
            </Typography>
          </Box>
          <Divider />
          <Stack spacing={2} sx={{ my: 1 }}>
            <FormControl sx={{ flexGrow: 1 }}>
              <FormLabel>Հին գաղտնաբառ</FormLabel>
              <Input
                size="sm"
                type="password"
                startDecorator={<LockIcon />}
                placeholder="Հին գաղտնաբաառ"
                sx={{ flexGrow: 1 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ flexGrow: 1 }}>
              <FormLabel>Նոր գաղտնաբառ</FormLabel>
              <Input
                size="sm"
                type="password"
                startDecorator={<LockIcon />}
                placeholder="Նոր գաղտնաբառ"
                sx={{ flexGrow: 1 }}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ flexGrow: 1 }}>
              <FormLabel>Հաստատել</FormLabel>
              <Input
                size="sm"
                type="password"
                startDecorator={<LockIcon />}
                placeholder="Հաստատել նոր գաղտնաբառը"
                sx={{ flexGrow: 1 }}
                value={approvedPassword}
                onChange={(e) => setApprovedPassword(e.target.value)}
              />
            </FormControl>
            <FormHelperText sx={{ mt: 0.75, fontSize: "xs" }}>
              Գաղտնաբառը պետք է պարունակի տառեր, թվեր։
            </FormHelperText>
          </Stack>
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button
                size="sm"
                variant="outlined"
                color="neutral"
                onClick={resetPasswordFields}
                disabled={!password && !newPassword && !approvedPassword}
              >
                Չեղարկել
              </Button>
              <Button
                size="sm"
                variant="solid"
                disabled={!canSubmit}
                onClick={() => onChangePwdSubmit(user.id)}
                loading={changePwdLoading}
              >
                Պահպանել
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  );
};

export default Profile;
