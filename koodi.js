fetch("prices.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(items) {
    let tableBody = document.getElementById("tableBody");
    let out = "";

    // Generate <tr> elements with collapsible behavior
    for (let item of items) {
      // Format the price with commas
      const formattedPrice = addCommasToNumber(item['Price/Gold']);
      
      out += `<tr class="accordion">
      <td>${item.name}</td>
      <td>${formattedPrice}</td>
      <td>${item.Rarity}</td>
      <td>${item.Attunement ? 'Yes' : 'No'}</td>
      </tr>
      
              <div class="panel">
                <p>${item.Description}</p>
              </div>`;
    }

    tableBody.innerHTML = out;

    // Item collapse information box (Accordion)
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        } 
      });
    }
  });

// Function to add commas to a number
function addCommasToNumber(number) {
  if (typeof number === 'number') {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    return 'not found';
  }
}


// Function to search/filter table rows based on user input
function searchTable() {
  let input, filter;
  // Get the user input element
  input = document.getElementById("myInput");
  // Get the value of the user input and convert it to uppercase for case-insensitive comparison
  filter = input.value.toUpperCase();
  // Get the table element
  table = document.getElementById("myTable");
  // Get all the table rows (tr elements)
  tr = table.getElementsByTagName("tr");
  // Loop through each table row
  for (i = 0; i < tr.length; i++) {
    // Get the first cell (td) element in the current row
    td = tr[i].getElementsByTagName("td")[0];
    // If a cell is found
    if (td) {
      // Get the text content of the cell and convert it to uppercase for comparison
      txtValue = td.textContent || td.innerText;
      // Check if the text value contains the user input
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        // If the input is found, display the row
        tr[i].style.display = "";
      } else {
        // If the input is not found, hide the row
        tr[i].style.display = "none";
      }
    }
  }
}

// Function to filter table rows based on selected rarity and attunement
function filterTable() {
  let table, tr, td, i, txtValue, rarityFilter, attunementFilter;
  // Get the table element
  table = document.getElementById("myTable");
  // Get all the table rows (tr elements)
  tr = table.getElementsByTagName("tr");
  // Get the selected value from the rarity dropdown list
  rarityFilter = document.getElementById("item_rarity_filter").value;
  // Get the selected value from the attunement dropdown list
  attunementFilter = document.getElementById("item_attunement_filter").value;
  // Loop through each table row
  for (i = 0; i < tr.length; i++) {
    // Get the third cell (td) element in the current row (assuming the rarity is in the fourth column)
    const rarityCell = tr[i].getElementsByTagName("td")[2];
    // Get the fourth cell (td) element in the current row (assuming the attunement is in the fifth column)
    const attunementCell = tr[i].getElementsByTagName("td")[3];
    // If both cells are found
    if (rarityCell && attunementCell) {
      // Get the text content of the cells and convert them to uppercase for comparison
      const rarityValue = rarityCell.textContent || rarityCell.innerText;
      const attunementValue = attunementCell.textContent || attunementCell.innerText;
      // Check if the rarity matches the selected filter and the attunement matches the selected filter
      if (
        (rarityFilter === "all" || rarityValue.toUpperCase() === rarityFilter.toUpperCase()) &&
        (attunementFilter === "all" || attunementValue.toUpperCase() === attunementFilter.toUpperCase())
      ) {
        // If both filters match or "all" is selected, display the row
        tr[i].style.display = "";
      } else {
        // If either filter does not match, hide the row
        tr[i].style.display = "none";
      }
    }
  }
}
