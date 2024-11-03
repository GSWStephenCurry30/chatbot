const API = (function () {
  const BASE_URL = 'https://study.duyiedu.com'
  const TOKEN_KEY = 'token'

  async function get(path) {
    const headers = {}
    const token = localStorage.getItem('token')
    if (token) {
      headers.authorization = 'Bearer ' + token
    }

    return fetch(BASE_URL + path, {
      headers
    })

  }

  async function post(path, params) {
    const headers = {
      "Content-Type": "application/json"
    }
    const token = localStorage.getItem('token')
    if (token) {
      headers.authorization = 'Bearer ' + token
    }

    return fetch(BASE_URL + path, {
      method: 'post',
      headers,
      body: JSON.stringify(params)
    })
  }

  async function register(info) {
    // const resp = await fetch(BASE_URL + '/api/user/reg', {
    //   method: 'post',
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(info)
    // })

    const resp = await post('/api/user/reg', info)

    return await resp.json()
  }

  async function login(info) {
    const resp = await fetch(BASE_URL + '/api/user/login', {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(info)

    })

    const token = resp.headers.get('authorization')
    const result = await resp.json()

    if (result.code === 0) {
      console.log(token);
      localStorage.setItem(TOKEN_KEY, token)
    }
    return result
  }

  async function exists(loginId) {
    // const resp = await fetch(BASE_URL + '/api/user/exists?loginId=' + loginId)
    const resp = await get('/api/user/exists?loginId=' + loginId)
    return resp.json()
  }

  async function profile() {
    const resp = await get('/api/user/profile')

    return resp.json()
  }

  async function sendChat(obj) {
    const resp = await post('/api/chat', obj)
    return resp.json()
  }

  async function getHistory() {
    const resp = await get('/api/chat/history')

    return await resp.json()
  }

  return {
    register,
    login,
    exists,
    profile,
    sendChat,
    getHistory
  }
})()

