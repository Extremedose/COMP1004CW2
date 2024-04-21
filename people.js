const { createClient } = supabase
const _supabase = createClient('https://xjmheuyoyvjlgfpfwdqs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqbWhldXlveXZqbGdmcGZ3ZHFzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMjg1MjAzOCwiZXhwIjoyMDI4NDI4MDM4fQ.jbCXYQ_eSysm4rGi5WDKu4e1UUnsmfSBrbC5VPHfV1Q')

async function loadData(searchInput = '', selectionName) {

    try {
        let { data, error } = await _supabase
            .from('People')
            .select('*')
            .order('PersonID', { ascending: true });

        let isInput;
        for (let i = 0; i < searchInput.length; i++) {
            if (searchInput.charAt(i) == ' ') {
                isInput = 1;
            } else {
                isInput = 0;
                break;
            }
        }
        if (searchInput && isInput == 0 && selectionName) {

            if (selectionName == "Name") {
                data = data.filter(people => people.Name.toUpperCase().includes(searchInput.toUpperCase()));
            } else if (selectionName == "LicenseNumber") {
                data = data.filter(people => people.LicenseNumber.toUpperCase().includes(searchInput.toUpperCase()));
            }


        }


        const tableBody = document.getElementById('people-table_body');
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
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}
async function search() {
    try {
        const searchInput = document.getElementById('searchInputPeople').value.trim();
        const option = document.getElementsByName("search_option");
        let selectedOption = null;
        for (let i = 0; i < option.length; i++) {
            if (option[i].checked) {
                selectedOption = option[i].value;
                break;
            }
        }
        if (selectedOption === 'name') {
            await loadData(searchInput, 'Name');

        } else if (selectedOption === 'license_number') {
            await loadData(searchInput, 'LicenseNumber');

        } else {
            await loadData();
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