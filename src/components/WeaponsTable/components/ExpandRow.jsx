const ExpandRow = ({ PARGEV, NOTE, QRGORCN, QRGORC_DATE, HODVAC, WVAYR }) => {
  return (
    <p style={{ margin: 0 }}>
      Պարգևատրում՝ {PARGEV || ""}, քրեական գործ՝{QRGORCN || ""} |{" "}
      {QRGORC_DATE || ""} | {HODVAC || ""} | {WVAYR || ""} | {NOTE || ""}
    </p>
  );
};

export default ExpandRow;
