import { useRef, useState } from "react";
import { Button, Divider, Space, Tour } from "antd";
import { toast } from "react-toastify";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { FaEllipsisH } from "react-icons/fa";

import { fileUploadUrl } from "./constants";
import translations from "../../../../utils/translations/am.json";

import "filepond/dist/filepond.min.css";
import "filepond/dist/filepond.min.css";

registerPlugin(FilePondPluginFileValidateType);

const StatisticsProfile = () => {
  const [files, setFiles] = useState([]);
  const { FILES } = translations;
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const [open, setOpen] = useState(false);
  const steps = [
    {
      title: "Upload File",
      description: "Put your files here.",
      cover: (
        <img
          alt="tour.png"
          src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
        />
      ),
      target: () => ref1.current,
    },
    {
      title: "Save",
      description: "Save your changes.",
      target: () => ref2.current,
    },
    {
      title: "Other Actions",
      description: "Click to see other actions.",
      target: () => ref3.current,
    },
  ];
  return (
    <>
      <div style={{ padding: "30px 10px 0 0" }}>
        <FilePond
          server={fileUploadUrl}
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
            toast.success(FILES.EXCEL_UPLOAD_SUCCESS, {
              progress: undefined,
            });
            setFiles([]);
            // refetch();
          }}
        />
        <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
      </div>
      <div>
        <Button type="primary" onClick={() => setOpen(true)}>
          Begin Tour
        </Button>
        <Divider />
        <Space>
          <Button ref={ref1}> Upload</Button>
          <Button ref={ref2} type="primary">
            Save
          </Button>
          <Button ref={ref3} icon={<FaEllipsisH />} />
        </Space>
      </div>
    </>
  );
};

export default StatisticsProfile;
