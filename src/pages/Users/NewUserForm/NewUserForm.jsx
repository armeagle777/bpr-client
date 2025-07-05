import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

import { Button, Form, Input, Select } from "antd";

const NewUserForm = ({
  form,
  checkEmailInBackend,
  onFinish,
  onCancel,
  isLoading,
  rolesOptions,
}) => {
  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 24,
    },
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Form {...layout} form={form} name="new_user" onFinish={onFinish}>
      <Form.Item
        name="firstName"
        label="Անուն"
        rules={[{ required: true, message: "Անվան դաշտը պարտադիր է" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Անուն" />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Ազգանուն"
        rules={[{ required: true, message: "Ազգանվան դաշտը պարտադիր է" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Ազգանուն" />
      </Form.Item>
      <Form.Item
        name="pashton"
        label="Պաշտոն"
        rules={[{ required: true, message: "Պաշտոն դաշտը պարտադիր է" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Պաշտոն" />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        label="Հեռ."
        validateTrigger="onBlur"
        rules={[
          {
            pattern: /^0\d{8}$/,
            message: "Խնդրում ենք մուտքագրել ճիշտ ֆորմատով՝ 0XXaabbcc",
          },
        ]}
      >
        <Input
          prefix={<PhoneOutlined />}
          placeholder="Հեռ. 0XXaabbcc"
          autoComplete="off"
        />
      </Form.Item>
      <Form.Item
        hasFeedback
        name="email"
        label="Էլ. փոստ"
        validateFirst
        rules={[
          { required: true, message: "Էլ. փոստը պարտադիր է" },
          { type: "email", message: "Խնդրում ենք մուտքագրել վավեր Էլ. փոստ" },
          {
            validator: async (_, email) => {
              if (email) {
                return checkEmailInBackend(email);
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input
          prefix={<MailOutlined />}
          placeholder="Էլ. փոստ"
          autoComplete="username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        label="Գաղտնաբառ"
        rules={[{ required: true, message: "Գաղտնաբառը պարտադիր է" }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Գաղտնաբառ"
        />
      </Form.Item>
      <Form.Item
        name="role"
        label="Դերը"
        rules={[{ required: true, message: "Դերի դաշտը պարտադիր է" }]}
      >
        <Select
          allowClear
          style={{
            width: "100%",
          }}
          placeholder="Դեր"
          // defaultValue={["a10", "c12"]}
          onChange={handleChange}
          options={rolesOptions}
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
            <Button
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
            <Button
              color="secondary"
              variant="outlined"
              style={{ marginLeft: "10px" }}
              onClick={onCancel}
            >
              Փակել
            </Button>
          </>
        )}
      </Form.Item>
    </Form>
  );
};

export default NewUserForm;
