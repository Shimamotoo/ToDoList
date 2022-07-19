const item = document.querySelector('input')
const inserir = document.querySelector('.campo button')
const excluir = document.querySelector('.header button')
const ul = document.querySelector('ul')

var itensLista = []

excluir.onclick = () => {
  itensLista = []
  updateLista()
}

item.addEventListener('keypress', e =>{
    if (e.key == 'Enter' && item.value != '') {
        setItemLista()
    }
})

inserir.onclick = () => {
    if (item.value != ''){
        setItemLista()
    }
}


function setItemLista() {
    if (itensLista.lengh >= 20) {
        alert('Lista cheia')
        return
    }

    itensLista.push({ 'item': item.value, 'status': '' })
    updateLista()
}

function updateLista() {
    localStorage.setItem('todoList', JSON.stringify(itensLista))
    carregarItem()
}

function carregarItem() {
    ul.innerHTML = '';
    itensLista = JSON.parse(localStorage.getItem('todoList')) ?? []
    itensLista.forEach((item, i) => {
        insertItemTela(item.item, item.status, i) 
    })
}

function insertItemTela(text, status, i) {
    const li = document.createElement('li')
    
    li.innerHTML = `
      <div class="divLi">
        <input type="checkbox" ${status} data-i=${i} onchange="done(this, ${i});" />
        <span data-si=${i}>${text}</span>
        <button onclick="removeItem(${i})" data-i=${i}><i class='bx bx-trash'></i></button>
      </div>
      `
    ul.appendChild(li)
  
    if (status) {
      document.querySelector(`[data-si="${i}"]`).classList.add('line-through')
    } else {
      document.querySelector(`[data-si="${i}"]`).classList.remove('line-through')
    }
  
    item.value = ''
  }

  function done(chk, i) {

  if (chk.checked) {
    itensLista[i].status = 'checked' 
  } else {
    itensLista[i].status = '' 
  }

  updateLista()
}

function removeItem(i) {
  itensLista.splice(i, 1)
  updateLista()
}
