const  fetchClients = async () => {
  const response = await fetch(`./cliente.json`);
  const clients = await response.json();
  
  return clients;
}
export {fetchClients};