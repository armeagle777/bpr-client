import { Alert, Table } from 'antd';
import { Box, Container, Fade, Paper, useTheme, alpha } from '@mui/material';
import { Bookmark as BookmarkIcon } from '@mui/icons-material';
import useLikesData from '../../hooks/useLikesData';
import PageTitle from '../../components/PageTitle/PageTitle';

const Likes = () => {
  const theme = useTheme();
  const {
    isLoading,
    isFetching,
    isError,
    error,
    data,
    columns,
    handlePageChange,
    page,
    pagination,
  } = useLikesData({
    pageSize: 10,
  });

  if (isError)
    return (
      <Fade in timeout={300}>
        <Alert severity="error">{error}</Alert>
      </Fade>
    );
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          padding: '30px 10px',
        }}
      >
        <Fade in timeout={600}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BookmarkIcon color="primary" />
            </Box>
            <PageTitle>Պահպանված Որոնումներ</PageTitle>
          </Box>
        </Fade>
        <Fade in timeout={800}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 1)} 0%, ${alpha(theme.palette.background.default, 0.5)} 100%)`,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
          >
            <Table
              bordered
              dataSource={data}
              columns={columns}
              rowClassName="editable-row"
              pagination={{
                onChange: handlePageChange,
                total: pagination?.total,
              }}
              loading={isFetching || isLoading}
            />
          </Paper>
        </Fade>
      </Box>
    </Container>
  );
};

export default Likes;
