
const url = 'https://jsonplaceholder.typicode.com/todos';

async function fetchUsers() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    renderUsers(data);
  } catch (error) {
    console.log(error);
  }
}