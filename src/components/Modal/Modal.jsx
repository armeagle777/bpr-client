import { Box, Modal as MuiModal } from "@mui/material";

const Modal = ({ children, isOpen, onClose, centered = true }) => {
  const style = {
    position: "absolute",
    left: "50%",
    top: centered ? "50%" : "20%",
    transform: centered ? "translate(-50%, -50%)" : "translateX(-50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  return (
    <MuiModal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style, width: "50%" }}>{children}</Box>
    </MuiModal>
  );
};

export default Modal;
