const  fetchBooks = async (query) => {

  const response = await fetch(`./mock-${query}.json`);
  const data = await response.json();
  
  return data.books;
}

export default fetchBooks;