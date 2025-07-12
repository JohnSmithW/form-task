import { Flex, Layout, Button, DatePicker, Form, Input, InputNumber, Select, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import dayjs from 'dayjs';
import './App.css';

const { Header, Footer, Content } = Layout;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const headerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4c4c4c',
};

const contentStyle = {
  minHeight: 120,
  color: '#000',
  backgroundColor: '#fff',
  boxShadow: '0 2px 8px #f0f1f2',
  border: '1px solid #f0f1f2',
  padding: '20px',
};

const footerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4c4c4c',
};

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: '100%',
  maxWidth: 700,
};

const flexStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  padding: '40px 0',
};

const initialData = {
  fullName: 'Иванов Иван Иванович',
  birthDate: dayjs().subtract(30, 'year'),
  experience: 5,
  position: 'Менеджер по работе с клиентами',
  login: 'ivanov',
  password: '',
  email: 'ivanov@example.com',
  phone: '',
  notes: '',
};

function App() {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    form.setFieldsValue(initialData);
  }, [form]);

  const handleCancel = () => {
    form.setFieldsValue(initialData);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  // for this task this function will not have any arguments
  const handleSubmit = (): void => {
    setIsEditing(false);
  };

  return (
    <Flex style={flexStyle}>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>Анкета</Header>
        <Content style={contentStyle}>
          <Form form={form} onFinish={handleSubmit} disabled={!isEditing} layout="vertical">
            <Row>
              <Col span={24}>
                <Form.Item
                  label="ФИО"
                  name="fullName"
                  rules={[
                    { required: true, message: 'Обязательное поле' },
                    { max: 100, message: 'Максимум 100 символов' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Дата рождения"
                  name="birthDate"
                  rules={[{ required: true, message: 'Обязательное поле' }]}
                >
                  <DatePicker
                    style={{ width: '100%' }}
                    onChange={() => {
                      if (form.getFieldValue('experience')) {
                        form.validateFields(['experience']);
                      }
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Стаж"
                  name="experience"
                  rules={[
                    {
                      validator: (_, value) => {
                        if (!value) return Promise.resolve();
                        const birthDate = form.getFieldValue('birthDate');
                        if (!birthDate) return Promise.resolve();
                        const age = dayjs().diff(birthDate, 'year');
                        return value <= age
                          ? Promise.resolve()
                          : Promise.reject(new Error('Стаж не может быть больше возраста'));
                      },
                    },
                    { type: 'number', max: 100, message: 'Максимум 100 лет' },
                  ]}
                >
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  label="Должность"
                  name="position"
                  rules={[{ required: true, message: 'Обязательное поле' }]}
                >
                  <Select
                    options={[
                      { label: 'Директор', value: 'Директор' },
                      {
                        label: 'Менеджер по работе с клиентами',
                        value: 'Менеджер по работе с клиентами',
                      },
                      { label: 'Специалист тех. поддержки', value: 'Специалист тех. поддержки' },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Логин"
                  name="login"
                  rules={[
                    { required: true, message: 'Обязательное поле' },
                    { min: 3, message: 'Минимум 3 символа' },
                    { max: 20, message: 'Максимум 20 символов' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Пароль"
                  name="password"
                  rules={[
                    { min: 6, message: 'Минимум 6 символов' },
                    { max: 12, message: 'Максимум 12 символов' },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Обязательное поле' },
                    { type: 'email', message: 'Некорректный email' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Телефон" name="phone">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  label="Примечание"
                  name="notes"
                  rules={[{ max: 400, message: 'Максимум 400 символов' }]}
                >
                  <Input.TextArea rows={3} />
                </Form.Item>
              </Col>
            </Row>
          </Form>

          <Flex gap="small" vertical justify="start">
            <Flex>
              <div style={{ textAlign: 'right', marginTop: 16 }}>
                <Button type="primary" onClick={handleEdit} disabled={isEditing}>
                  Изменить
                </Button>
              </div>
            </Flex>

            <Flex gap="small">
              <Button
                type="primary"
                htmlType="submit"
                disabled={!isEditing}
                onClick={() => form.submit()}
              >
                Сохранить
              </Button>
              <Button onClick={handleCancel} disabled={!isEditing}>
                Отмена
              </Button>
            </Flex>
          </Flex>
        </Content>
        <Footer style={footerStyle}>Тестовое задание</Footer>
      </Layout>
    </Flex>
  );
}

export default App;
