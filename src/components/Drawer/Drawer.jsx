import { Drawer as AntDrawer, Button, Space } from "antd";

const Drawer = ({ open, children, title, onClose, loading, extra }) => {
  return (
    <AntDrawer
      closable
      destroyOnClose
      title={title}
      placement="right"
      open={open}
      loading={loading}
      onClose={onClose}
      zIndex={10000}
      extra={extra}
    >
      {children}
    </AntDrawer>
  );
};

export default Drawer;
