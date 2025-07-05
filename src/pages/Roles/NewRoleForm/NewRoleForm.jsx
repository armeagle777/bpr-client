import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

import { Button, Form, Input, Select } from "antd";

const NewRoleForm = ({ form, onFinish, onCancel, isLoading, permissions }) => {
  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 24,
    },
  };
  const handleChange = (val) => {
    console.log("val:::::: ", val);
  };
  return (
    <Form {...layout} form={form} name="new_user" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Անուն"
        rules={[{ required: true, message: "Անվան դաշտը պարտադիր է" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Անուն" />
      </Form.Item>
      <Form.Item
        name="permissions"
        label="Դերը"
        rules={[
          { required: true, message: "Թույլտվությունների դաշտը պարտադիր է" },
        ]}
      >
        <Select
          mode="multiple"
          allowClear
          style={{
            width: "100%",
          }}
          placeholder="Թույլտվություն"
          onChange={handleChange}
          options={permissions}
          getPopupContainer={(trigger) => trigger.parentNode}
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 4,
        }}
        shouldUpdate
      >
        {() => (
          <>
            <Button color="secondary" variant="outlined" onClick={onCancel}>
              Փակել
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              type="primary"
              htmlType="submit"
              loading={isLoading}
              disabled={
                !form.isFieldsTouched(false) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Գրանցել
            </Button>
          </>
        )}
      </Form.Item>
    </Form>
  );
};

export default NewRoleForm;
