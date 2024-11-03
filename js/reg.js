
const txtValidator = new FieldValidator('txtLoginId', async function (val) {
  if (!val) {
    return '账号不能为空'
  }

  const { data: isExist } = await API.exists(val)
  if (isExist) {
    return '账号已经被使用了,换个号吧,兄弟'
  }
})

const nicknameValidator = new FieldValidator('txtNickname', async function (val) {
  if (!val) {
    return '昵称不能为空'
  }
})

const pwdValidator = new FieldValidator('txtLoginPwd', async function (val) {
  if (!val) {
    return '密码不能为空'
  }
})

const pwdConfirmValidator = new FieldValidator('txtLoginPwdConfirm', async function (val) {
  if (!val) {
    return '确认密码不能为空'
  }

  if (val !== pwdValidator.input.value) {
    return '确认密码必须于密码一致'
  }
})

const form = $('.user-form')

form.onsubmit = async function (e) {
  e.preventDefault()

  const result = await FieldValidator.validate(txtValidator, nicknameValidator, pwdValidator, pwdConfirmValidator)

  if (!result) {
    return
  }
  const formData = new FormData(form)
  const data = Object.fromEntries(formData.entries())

  const resp = await API.register(data)
  console.log(resp);
  if (resp.code === 0) {
    alert('注册成功，点击确定，跳转到登录页');
    location.href = './login.html'
  }
}