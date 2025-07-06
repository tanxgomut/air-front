import mock from '../mockAdapter';

mock.onPost('/api/register').reply((config) => {
  const { name, tel, password } = JSON.parse(config.data)

  if (tel === '0600000000') {
    return [400, { message: 'เบอร์โทรนี้มีผู้ใช้แล้ว' }]
  }

  return [200, {
    token: 'mocked-register-token',
    user: { name, tel ,password},
  }]
})

mock.onPost('/api/login').reply((config) => {
  const { tel, password } = JSON.parse(config.data)

  if (tel !== '0812345678' || password !== 'Abc12345') {
    return [401, { message: 'เบอร์โทรหรือรหัสผ่านไม่ถูกต้อง' }]
  }

  return [200, {
    token: 'mocked-login-token',
    user: { name: 'ผู้ใช้ทดสอบ', tel },
  }]
})