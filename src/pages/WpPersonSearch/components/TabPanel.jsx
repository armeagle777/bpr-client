const TabPanel = ({ hidden, children, id, ariaLabel, ...rest }) => {
  return (
    <div
      role="tabpanel"
      hidden={hidden}
      id={id}
      aria-labelledby={ariaLabel}
      {...rest}
    >
      {children}
    </div>
  );
};

export default TabPanel;
