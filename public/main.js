const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

update.addEventListener('click', _ =>{
    fetch('/quotes', {
        method: 'put',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Random name',
            quote: 'Random task'
        })
    })
    .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        console.log(response)
        window.location.reload(true)
      })

})

deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Random name'
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(response => {
        console.log(response)
        if(response === 'No things to delete'){
            messageDiv.textContent = 'No more things to delete'
        } else {
            window.location.reload(true)
        }
    })
    
})