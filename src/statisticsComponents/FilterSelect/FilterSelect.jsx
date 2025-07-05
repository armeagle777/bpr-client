import { Select } from "antd";

const FilterSelect = ({ onChange, options, placeholder, value }) => {
  return (
    <Select
      // allowClear
      style={{
        flex: 1,
      }}
      placeholder={placeholder}
      onChange={onChange}
      options={options}
      value={value || undefined}
    />
  );
};

export default FilterSelect;
