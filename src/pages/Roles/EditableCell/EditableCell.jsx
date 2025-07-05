import { Form, Input, InputNumber, Select } from "antd";

const EditableCell = ({
  index,
  title,
  regex,
  record,
  editing,
  required,
  children,
  inputType,
  dataIndex,
  placeholder,
  options,
  defaultValue,
  ...restProps
}) => {
  const inputNode =
    inputType === "number" ? (
      <InputNumber />
    ) : inputType === "select" ? (
      <Select
        disabled={false}
        defaultValue={defaultValue}
        options={options}
        mode="multiple"
        allowClear
      />
    ) : (
      <Input placeholder={placeholder || ""} />
    );

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: required,
              message: `Please Input ${title}!`,
            },
            ...(regex
              ? [
                  {
                    pattern: new RegExp(regex),
                    message: `Please enter a valid ${title}!`,
                  },
                ]
              : []),
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
