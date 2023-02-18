const issuedBooks = [];

// Get references to the form and table
const issueForm = document.getElementById('issue-form');
const issuedBooksTable = document.getElementById('issued-books');

// Add event listener to form submit button
issueForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get values from form inputs
  const bookNameInput = document.getElementById('book-name');
  const issuedToInput = document.getElementById('issued-to');
  const bookName = bookNameInput.value.trim();
  const issuedTo = issuedToInput.value.trim();

  // Clear form inputs
  bookNameInput.value = '';
  issuedToInput.value = '';

  // Add new book object to array
  const issuedTime = new Date();
  const book = {
    id: issuedBooks.length + 1,
    book_name: bookName,
    issued_to: issuedTo,
    issued_time: issuedTime,
    status: 'not returned'
  };
  issuedBooks.push(book);

  // Update table with new book row
  const tableRow = document.createElement('tr');
  tableRow.innerHTML = `
    <td>${book.id}</td>
    <td>${book.book_name}</td>
    <td>${book.issued_to}</td>
    <td>${book.issued_time.toLocaleString()}</td>
    <td class="status">${book.status}</td>
  `;
  issuedBooksTable.querySelector('tbody').appendChild(tableRow);
});

// Add event listener to status column
issuedBooksTable.addEventListener('click', (event) => {
  if (event.target.classList.contains('status')) {
    // Get ID of book
    const bookId = parseInt(event.target.parentNode.querySelector('td:first-child').textContent);

    // Find book object in array
    const bookIndex = issuedBooks.findIndex(book => book.id === bookId);
    const book = issuedBooks[bookIndex];

    // Update status in object and table cell
    if (book.status === 'not returned') {
      book.status = 'returned';
      event.target.classList.add('returned');
      event.target.classList.remove('not-returned');
    } else {
      book.status = 'not returned';
      event.target.classList.add('not-returned');
      event.target.classList.remove('returned');
    }
    event.target.textContent = book.status;
  }
});