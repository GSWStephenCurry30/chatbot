
const txtValidator = new FieldValidator('txtLoginId', async function (val) {
  if (!val) {
    return '账号不能为空'
  }
})

const pwdValidator = new FieldValidator('txtLoginPwd', async function (val) {
  if (!val) {
    return '密码不能为空'
  }
})

const form = $('.user-form')

form.onsubmit = async function (e) {
  e.preventDefault()

  const result = await FieldValidator.validate(txtValidator, pwdValidator)

  if (!result) {
    return
  }
  const formData = new FormData(form)
  const data = Object.fromEntries(formData.entries())

  const resp = await API.login(data)
  console.log(resp);
  if (resp.code === 0) {
    alert('注册成功，点击确定，跳转到登录页');
    location.href = './index.html'
  } else {
    txtValidator.p.innerText = '账号或密码错误';
    pwdValidator.input.value = '';
  }
}