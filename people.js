function fetchAndParseCSV() {
    fetch('coursework-database/People.csv')
        .then(response => response.text())
        .then(csv => {
            const rows = csv.split('\n').slice(1);
            const tableBody = document.getElementById('table_body');

            rows.forEach((row, index) => {
                const cells = row.split(',');
                const personID = cells[0];
                const name = cells[1];
                const address = cells[2];
                const dob = cells[3];
                const licenseNumber = cells[4];
                const expiryDate = cells[5];

                const newRow = document.createElement('tr');
                newRow.classList.add(index % 2 === 0 ? 'light-grey-row' : 'white-row');
                
                const personIDCell = document.createElement('td');
                personIDCell.textContent = personID;
                const nameCell = document.createElement('td');
                nameCell.textContent = name;
                const addressCell = document.createElement('td');
                addressCell.textContent = address;
                const dobCell = document.createElement('td');
                dobCell.textContent = dob;
                const licenseNumberCell = document.createElement('td');
                licenseNumberCell.textContent = licenseNumber;
                const expiryDateCell = document.createElement('td');
                expiryDateCell.textContent = expiryDate;

                newRow.appendChild(personIDCell);
                newRow.appendChild(nameCell);
                newRow.appendChild(addressCell);
                newRow.appendChild(dobCell);
                newRow.appendChild(licenseNumberCell);
                newRow.appendChild(expiryDateCell);

                tableBody.appendChild(newRow);
            });
        })
        .catch(error => console.error('Error fetching the CSV file:', error));
}
function filterByName() {
    const searchInput = document.getElementById('search_input_text').value.toLowerCase();
    const rows = document.querySelectorAll('#table_body tr');

    rows.forEach(row => {
        const name = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        if (name.includes(searchInput)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}
function filterByLicenseNumber() {
    const searchInput = document.getElementById('search_input_text').value.toLowerCase();
    const rows = document.querySelectorAll('#table_body tr');

    rows.forEach(row => {
        const licenseNumber = row.querySelector('td:nth-child(5)').textContent.toLowerCase();
        if (licenseNumber.includes(searchInput)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function filter() {
    const option = document.getElementsByName("search_option");
    let selectedOption = null;

    for (let i = 0; i < option.length; i++) {
        if (option[i].checked) {
            selectedOption = option[i].value;
            break;
        }
    }
    if (selectedOption === 'name') {
        filterByName();
    } else if (selectedOption === 'licence_number') {
        filterByLicenseNumber();
    } else {
        console.log("No option was selected");
    }
}
window.onload = fetchAndParseCSV;