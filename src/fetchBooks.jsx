const  fetchBooks = async () => {

  const response = await fetch('./mock.json');
  const data = await response.json();

  return data.books;
}

export default fetchBooks;