const data = [
    { column1: 'Data 1-1', column2: 'Data 1-2', column3: 'Data 1-3' },
    { column1: 'Data 2-1', column2: 'Data 2-2', column3: 'Data 2-3' },
    // Add more data...
  ];
  
  const tableBody = document.getElementById('tableBody');
  data.forEach((item) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${item.column1}</td><td>${item.column2}</td><td>${item.column3}</td>`;
    tableBody.appendChild(row);
  });
  const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
  const filter = searchInput.value.toUpperCase();
  const rows = tableBody.getElementsByTagName('tr');
  for (let i = 0; i < rows.length; i++) {
    const rowData = rows[i].getElementsByTagName('td');
    let shouldDisplay = false;
    for (let j = 0; j < rowData.length; j++) {
      const cell = rowData[j];
      if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
        shouldDisplay = true;
        break;
      }
    }
    rows[i].style.display = shouldDisplay ? '' : 'none';
  }
});
const rowsPerPage = 5; // Number of rows to display per page
const totalPages = Math.ceil(data.length / rowsPerPage);

// Function to display the specified page
function displayPage(page) {
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const rows = tableBody.getElementsByTagName('tr');
  for (let i = 0; i < rows.length; i++) {
    rows[i].style.display = i >= startIndex && i < endIndex ? '' : 'none';
  }
}

// Function to generate pagination buttons
function generatePaginationButtons() {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.innerText = i;
    button.addEventListener('click', () => {
      displayPage(i);
    });
    pagination.appendChild(button);
  }
}

// Display the first page by default
displayPage(1);
generatePaginationButtons();
