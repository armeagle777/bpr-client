import { Checkbox, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CheckboxButton = ({ text, onRoleFilter, checked, value }) => {
  const textsArray = text.split(" ");
  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      {/* Hidden Checkbox */}
      <Checkbox
        checked={checked}
        onChange={onRoleFilter}
        sx={{ display: "none" }}
      />
      <Button
        fullWidth
        variant="text"
        onClick={() => onRoleFilter(value || text)}
        sx={{
          display: "flex",
          boxSizing: "border-box",
          maxHeight: "36px",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          textTransform: "none",
          border: "none",
          backgroundColor: checked ? "#999" : "transparent",
          color: checked ? "common.white" : "primary.main",
          "&:hover": {
            backgroundColor: checked ? "#999" : "action.hover",
          },
        }}
      >
        {textsArray?.length > 2 ? `${textsArray[0]} ${textsArray[1]}...` : text}
        {checked && (
          <IconButton
            size="small"
            sx={{
              color: "inherit",
              marginLeft: "auto",
            }}
            onClick={(e) => {
              e.stopPropagation();
              onRoleFilter(value || text);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        )}
      </Button>
    </div>
  );
};

export default CheckboxButton;
