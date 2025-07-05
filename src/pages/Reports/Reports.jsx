import { Alert, Table } from "antd";
import Dialog from "@mui/material/Dialog";
import { Box, Grid, Typography, TextField } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import PdfViewer from "../../components/pdfViewer/PdfViewer";

import PageTitle from "../../components/PageTitle/PageTitle";
import { useTexekanqData } from "../../hooks/useTexekanqData";
import React, { useState } from "react";
import CheckboxButton from "../../components/CheckboxButton/CheckboxButton";

const Reports = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    columns,
    filters,
    pagination,
    showDialog,
    setShowDialog,
    onTextSearch,
    base64Data,
    isTypesLoading,
    isTypesError,
    onPaginationChange,
    typesError,
    types,
    onTypeFilter,
  } = useTexekanqData();
  if (isError) return <Alert severity="error">{error}</Alert>;

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <Grid container spacing={1} sx={{ padding: "30px 10px" }}>
      <Grid item xs={2} sx={{ borderRight: "1px solid #999" }}>
        <Box
          sx={{
            padding: "10px 5px",
          }}
        >
          <Typography variant="h6" component="h6" align="center" mb={2}>
            Ֆիլտրեր
          </Typography>
          <TextField
            value={filters.search}
            id="filled-search"
            label="Որոնել"
            type="search"
            fullWidth
            sx={{ mb: 2 }}
            onChange={onTextSearch}
          />
          <Typography variant="p" component="p">
            Ձևեր
          </Typography>
          <Grid container direction="column" spacing={1} sx={{ mt: "2px" }}>
            {types?.length &&
              types.map((type) => (
                <Grid item key={type.id}>
                  <CheckboxButton
                    text={type.name}
                    value={type.id}
                    onRoleFilter={onTypeFilter}
                    checked={filters.types.includes(type.id)}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={10}>
        {/* <Box> */}
        <PageTitle>Ստեղծված տեղեկանքներ</PageTitle>
        <Table
          bordered
          dataSource={data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            pageSizeOptions: [10, 20, 50],
            current: pagination?.page,
            pageSize: pagination?.pageSize,
            onChange: onPaginationChange,
            total: pagination?.total,
          }}
          loading={isLoading}
        />
        {/* </Box> */}
        {showDialog && (
          <Dialog
            fullScreen
            open={showDialog}
            onClose={() => setShowDialog(false)}
            TransitionComponent={Transition}
          >
            <AppBar sx={{ position: "relative" }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={() => setShowDialog(false)}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <PdfViewer string={base64Data?.attachment} />
          </Dialog>
        )}
      </Grid>
    </Grid>
  );
};

export default Reports;
