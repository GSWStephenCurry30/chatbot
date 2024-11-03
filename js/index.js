const doms = {
  aside: {
    nickname: $('#nickname'),
    loginId: $('#loginId')
  }
}

init()

async function init() {
  initHistory()

  initProfile()

  $('.msg-container').onsubmit = async function (e) {
    e.preventDefault()

    const str = $('#txtMsg').value
    $('#txtMsg').value = ''
    addHistory({
      from: 'haha',
      to: null,
      content: str,
      createdAt: Date.now()
    })
    setScrollBar()

    const { data } = await API.sendChat({
      from: 'haha',
      to: null,
      content: str,
      createdAt: Date.now()
    })

    addHistory(data)

    setScrollBar()
  }
}

async function initHistory() {
  let { data: history } = await API.getHistory()
  history = history.slice(-10)
  history.forEach(item => {
    addHistory(item)
  })

  setScrollBar()
}

function setScrollBar() {
  $('.chat-container').scrollTop = $('.chat-container').scrollHeight
}

async function initProfile() {
  const { data: profile } = await API.profile()
  doms.aside.nickname.innerText = profile.nickname
  doms.aside.loginId.innerText = profile.loginId
}

function addHistory({ content, createdAt, from }) {
  const container = $('.chat-container')
  const chat = $$$('div')
  chat.className = from ? 'chat-item me' : 'chat-item'
  const avatar = $$$('img')
  avatar.src = from ? './asset/avatar.png' : './asset/robot-avatar.jpg'
  avatar.classList.add('chat-avatar')
  const cont = $$$('div')
  cont.innerText = content
  cont.classList.add('chat-content')
  const date = $$$('div')
  date.innerText = formatDate(createdAt)
  date.classList.add('chat-date')

  chat.appendChild(avatar)
  chat.appendChild(cont)
  chat.appendChild(date)

  container.appendChild(chat)
}

function formatDate(datestamp) {
  const date = new Date(datestamp)

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}
