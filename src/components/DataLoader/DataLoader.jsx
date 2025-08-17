import { FadeLoader } from "react-spinners";

const DataLoader = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "20px",
      }}
    >
      <FadeLoader color="#105fc7" />
    </div>
  );
};

export default DataLoader;
