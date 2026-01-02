select_options = document.querySelector('#select')
amount = document.querySelector('#inpute')
date = document.querySelector('#date')
add_botton = document.querySelector('#submit')
table = document.querySelector('#table')
total = document.querySelector('.total')

console.log(amount.value)
console.log(date.value)

array = JSON.parse(localStorage.getItem('Expance')) || []
sum1 = 0

function validation (e) {
  e.preventDefault()
  if (
    select_options.value == 'select' ||
    amount.value == '' ||
    date.value == ''
  ) {
    alert('Fill all fields')
    return false
  }
  Display_fontEnd()
  window.location.reload()
}

function Display_fontEnd () {
  tr = document.createElement('tr')
  th_1 = document.createElement('td')
  th_2 = document.createElement('td')
  th_3 = document.createElement('td')
  th_4 = document.createElement('td')
  del = document.createElement('button')
  del.className = 'del'
  del.innerText = 'Delet'
  edit = document.createElement('button')
  edit.className = 'edit'
  edit.innerText = 'Edit'

  th_1.innerText = select_options.value
  th_2.innerText = parseInt(amount.value)
  th_3.innerText = date.value

  table.appendChild(tr)
  tr.appendChild(th_1)
  th_1.className = 'catogory'
  tr.appendChild(th_2)
  th_2.className = 'amount'
  tr.appendChild(th_3)
  th_3.className = 'date'
  tr.appendChild(th_4)
  th_4.appendChild(del)
  th_4.appendChild(edit)
  console.log(amount.value)
  console.log(date.value)

  store_in_localStorage()
  Cleanup()
}

function Cleanup () {
  select_options.value = 'Select'
  amount.value = ''
  date.value = ''
}

function store_in_localStorage () {
  e = {
    catogory: select_options.value,
    amount: parseInt(amount.value),
    date: date.value
  }
  console.log(e)

  array.push(e)
  localStorage.setItem('Expance', JSON.stringify(array))
}

function Display_from_localStorage () {
  saved = JSON.parse(localStorage.getItem('Expance')) || []
  saved.forEach(e => {
    tr = document.createElement('tr')
    th_1 = document.createElement('td')
    th_1.className = 'catogory'
    th_2 = document.createElement('td')
    th_2.className = 'amount'
    th_3 = document.createElement('td')
    th_3.className = 'date'
    th_4 = document.createElement('td')
    del = document.createElement('button')
    del.className = 'del'
    del.innerText = 'Delet'
    edit = document.createElement('button')
    edit.className = 'edit'
    edit.innerText = 'Edit'

    th_1.innerText = e.catogory
    th_2.innerText = e.amount
    th_3.innerText = e.date

    table.appendChild(tr)
    tr.appendChild(th_1)
    tr.appendChild(th_2)
    tr.appendChild(th_3)
    tr.appendChild(th_4)
    th_4.appendChild(del)
    th_4.appendChild(edit)
  })
}

function Sum () {
  saved = JSON.parse(localStorage.getItem('Expance') || [])
  saved.forEach(e => {
    sum1 += parseInt(e.amount)
    total.innerText = sum1
  })
}

function Del_from_frontEnd (e) {
  if (e.target.innerText == 'Delet') {
    e.target.parentElement.parentElement.remove()
    catogory = e.target.parentElement.parentElement.querySelector('.catogory')
    cat = catogory.innerHTML
    amount = e.target.parentElement.parentElement.querySelector('.amount')
    amu = amount.innerHTML
    date = e.target.parentElement.parentElement.querySelector('.date')
    dat = date.innerHTML
    btn = e.target.parentElement.querySelector('.del')
    console.log(btn.innerText)
    window.location.reload()
    Del_from_localStorage(cat, amu, dat)
  }
}
function Edit_from_frontEnd (e) {
  if (e.target.innerText == 'Edit') {
    if (
      select_options.value == 'select' ||
      amount.value == '' ||
      date.value == ''
    ) {
      alert('Fill all fields')
      return false
    } else {
      catogory = e.target.parentElement.parentElement.querySelector('.catogory')
      cat = catogory.innerHTML
      catogory.innerHTML = select_options.value
      amoun = e.target.parentElement.parentElement.querySelector('.amount')
      amo = amoun.innerHTML
      amoun.innerHTML = parseInt(amount.value)
      dat = e.target.parentElement.parentElement.querySelector('.date')
      olddate = dat.innerHTML
      dat.innerHTML = date.value
      Edit_from_localStorge(cat, amo, olddate)
    }
  }
}
function Edit_from_localStorge (cat, amo, olddate) {
  newcatogory = select_options.value
  newamount = parseInt(amount.value)
  newdate = date.value
  saved = JSON.parse(localStorage.getItem('Expance') || [])
  index = saved.findIndex(
    item => item.cat === cat && item.amo === amo && item.olddate === olddate
  )
  console.log(index)
  if (index !== -1) {
    saved[index] = {
      newcatogory,
      newamount,
      newdate
    }
    localStorage.setItem('Expance', JSON.stringify(saved))
  }
}

function Del_from_localStorage (cat, amo, dat) {
  saved = JSON.parse(localStorage.getItem('Expance') || [])

  index = saved.indexOf({
    cat,
    amo,
    dat
  })
  saved.splice(index, 1)
  localStorage.setItem('Expance', JSON.stringify(saved))
}
document.addEventListener('click', Del_from_frontEnd)
document.addEventListener('click', Edit_from_frontEnd)
document.addEventListener('DOMContentLoaded', Display_from_localStorage)
document.addEventListener('DOMContentLoaded', Sum)
add_botton.addEventListener('click', validation)
