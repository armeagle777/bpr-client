import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { toast } from "react-toastify";
import "filepond/dist/filepond.min.css";
import "filepond/dist/filepond.min.css";

import ExcelDataTable from "../components/excelDataTable/ExcelDataTable";
import { messages } from "../utils/constants";
import { getSpheres } from "../api/personsApi";

registerPlugin(FilePondPluginFileValidateType);

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const { excelFromFile } = { ...messages };
  const { uploadSuccess } = { ...excelFromFile };

  const { isLoading, isFetching, isError, error, data, refetch } = useQuery(
    ["spheres"],
    () => getSpheres(),
    {
      keepPreviousData: false,
    }
  );

  return (
    <div style={{ padding: "30px 10px 0 0" }}>
      <FilePond
        server={import.meta.env.VITE_SERVER_URL + "/sphere/upload"}
        allowFileTypeValidation={true}
        acceptedFileTypes={[
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ]}
        allowMultiple={false}
        maxFiles={1}
        files={files}
        onupdatefiles={(fileItems) => {
          setFiles(fileItems.map((fileItem) => fileItem.file));
        }}
        labelIdle='*.xlsx ֆորմատի նիշքը տեղադրել այստեղ  կամ <span class="filepond--label-action">Բացել</span>'
        checkValidity
        onerror={(err) => {
          console.log("error", err);
        }}
        onload={(res) => {
          console.log("res:::::: ", res);
        }}
        onprocessfiles={() => {
          toast.success(uploadSuccess, {
            progress: undefined,
          });
          setFiles([]);
          refetch();
        }}
      />
      {isLoading || isFetching ? (
        "Loading..."
      ) : (
        <ExcelDataTable isError={isError} error={error} rowData={data} />
      )}
    </div>
  );
};

export default FileUpload;
