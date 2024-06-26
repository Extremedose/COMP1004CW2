const { createClient } = supabase
const _supabase = createClient('https://xjmheuyoyvjlgfpfwdqs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqbWhldXlveXZqbGdmcGZ3ZHFzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMjg1MjAzOCwiZXhwIjoyMDI4NDI4MDM4fQ.jbCXYQ_eSysm4rGi5WDKu4e1UUnsmfSBrbC5VPHfV1Q')

async function loadData(searchInput = '', selectionName) {
    try {
        let { data, error } = await _supabase
            .from('People')
            .select('*')
            .order('PersonID', { ascending: true });

        if (selectionName == "Name") {
            data = data.filter(people => people.Name.toUpperCase().includes(searchInput.toUpperCase()));
        } else if (selectionName == "LicenseNumber") {
            data = data.filter(people => people.LicenseNumber.toUpperCase().includes(searchInput.toUpperCase()));
        }

        const tableBody = document.getElementById('results');
        tableBody.innerHTML = '';

        data.forEach(people => {
            const row = document.createElement('tr');

            row.innerHTML = `
            <td>${people.PersonID || 'Not Known'}</td>
            <td>${people.Name || 'Not Known'}</td>
            <td>${people.Address || 'Not Known'}</td>
            <td>${people.DOB || 'Not Known'}</td>
            <td>${people.LicenseNumber || 'Not Known'}</td>
            <td>${people.ExpiryDate || 'Not Known'}</td>
          `;
            tableBody.appendChild(row);
        });
        if (data.length == 0) {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.setAttribute('colspan', '6');
            cell.classList.add('no-data-found');
            cell.textContent = 'Person not found';
            row.appendChild(cell);
            tableBody.appendChild(row);
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}
async function search() {
    try {
        
        let messageElement = document.getElementById("message");
        const searchInputName = document.getElementById('name').value.trim();
        const searchInputLicenseNumber = document.getElementById('license').value.trim().toUpperCase();

        if (searchInputName == "" && searchInputLicenseNumber == "") {
            console.log("No Search Inputs are filled");
            document.querySelector('#message').style.color = "red";
            messageElement.textContent = "Error: No Seach Inputs have been Filled";
            document.querySelector('#message').style.visibility = "visible";
            document.querySelector('#name').style.border = "Solid Red 2px";
            document.querySelector('#license').style.border = "Solid Red 2px";

        } else if (searchInputName != "" && searchInputLicenseNumber != "") {
            console.log("Both Search Inputs are filled");
            document.querySelector('#message').style.color = "red";
            messageElement.textContent = "Error: Both Seach Inputs have been Filled";
            document.querySelector('#message').style.visibility = "visible";
            document.querySelector('#name').style.border = "Solid Red 2px";
            document.querySelector('#license').style.border = "Solid Red 2px";

        } else {
            messageElement.textContent = "Search successful";
            document.querySelector('#message').style.visibility = "visible";
            document.querySelector('#message').style.color = "#fff";
            document.querySelector('#name').style.border = "Solid transparent 2px";
            document.querySelector('#license').style.border = "Solid transparent 2px";
            
            if (searchInputName == "") {
                document.querySelector('#license').style.border = "Solid green 2px";
                console.log("License Number: " + searchInputLicenseNumber);
                await loadData(searchInputLicenseNumber, "LicenseNumber");

            } else {
                document.querySelector('#name').style.border = "Solid green 2px";
                console.log("Name: " + searchInputName);
                await loadData(searchInputName, "Name");

            }
        }

    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}
async function handleKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        await search();
    }
}
window.onload = loadData;

