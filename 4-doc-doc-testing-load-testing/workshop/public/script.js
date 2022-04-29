window.onload = function() {
  fetch('/todo', {
    method: 'GET'
  })
  .then((res) => res.json())
  .then((body) => {
    const todoBody = document.getElementById('todo-body');
    const doneBody = document.getElementById('done-body');
    body.forEach((todo, index) => {
      if (todo.done) {
        // add to done
        const row = document.createElement('tr');
        row.innerHTML = `<td id=${'donetodo-' + index}>${todo.text}</td>`;
        doneBody.appendChild(row);
      } else {
        // add to todo table
        const row = document.createElement('tr');
        row.id = `todo-${index}`;
        row.innerHTML = `
          <td scope="row" class="text-left">${todo.text}</td>
          <td class="d-flex flex-row justify-content-around">
          <button
              class="btn btn-outline-danger btn-sm"
              data-todo=${'canceltodo-' + index}
              id=${'cancel-' + todo._id}
              onClick="cancelTODO(event)"
            >
            <i class="fa-solid fa-trash-can"></i>
            </button>
            <button
              class="btn btn-outline-success btn-sm"
              data-todo=${'donetodo-' + index}
              id=${todo._id}
              onClick="doneTODO(event)"
            >
              Done
            </button>
          </td>`

        todoBody.appendChild(row);
      }
    })
  })
}

function createTODO() {
  const todo = document.querySelector('input').value;
  fetch('/todo', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: todo, done: false })
  })
  .then(() => window.location.reload());
}



function doneTODO(event) {
  const { id } = event.target;
  fetch(`/todo/${id}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ done: true })
  })
  .then(() => window.location.reload());
}


function cancelTODO(event) {
  try {
    const result = event.target.id.split('cancel-')
    fetch(`/todo/${result[1]}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => window.location.reload())
  
  }catch(err) {
    console.log('[cancelTODO]',err);
  }
  

}