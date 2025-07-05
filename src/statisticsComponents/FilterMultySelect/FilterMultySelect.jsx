import { Select } from "antd";
import { useState } from "react";

const FilterMultySelect = ({ options, placeholder, onChange, value = [] }) => {
  return (
    <Select
      mode="multiple"
      style={{
        flex: 1,
      }}
      allowClear
      options={options}
      placeholder={placeholder}
      maxTagCount="responsive"
      defaultValue={value}
      onChange={onChange}
    />
  );
};

export default FilterMultySelect;
