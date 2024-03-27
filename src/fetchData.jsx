const  fetchBooks = async (query) => {
  const response = await fetch(`./mock-${query}.json`);
  const data = await response.json();
  
  return data.books;
}

const  fetchClients = async () => {
  const response = await fetch(`./cliente.json`);
  const clients = await response.json();
  
  return clients;
}
export {fetchBooks ,fetchClients};