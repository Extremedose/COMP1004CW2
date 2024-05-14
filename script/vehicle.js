const { createClient } = supabase
const _supabase = createClient('https://xjmheuyoyvjlgfpfwdqs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqbWhldXlveXZqbGdmcGZ3ZHFzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMjg1MjAzOCwiZXhwIjoyMDI4NDI4MDM4fQ.jbCXYQ_eSysm4rGi5WDKu4e1UUnsmfSBrbC5VPHfV1Q')

async function loadData(searchInput = '') {
  try {
    let { data, error } = await _supabase
      .from('Vehicle')
      .select('*, People(Name, LicenseNumber)')
      .order('OwnerID', { ascending: true });

    let isInput;
    for (let i = 0; i < searchInput.length; i++) {
      if (searchInput.charAt(i) == ' ') {
        isInput = 1;
      } else {
        isInput = 0;
        break;
      }
    }

    if (searchInput && isInput == 0) {
      data = data.filter(vehicle => vehicle.VehicleID.toUpperCase().includes(searchInput.toUpperCase()));
    }

    const tableBody = document.getElementById('vehicle-table_body');
    tableBody.innerHTML = '';

    data.forEach(vehicle => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${vehicle.People ? vehicle.People.Name || 'no owner' : 'no owner'}</td>
        <td>${vehicle.People ? vehicle.People.LicenseNumber || 'no owner' : 'no owner'}</td>
        <td>${vehicle.VehicleID || 'no owner'}</td>
        <td>${vehicle.Make || 'no owner'}</td>
        <td>${vehicle.Model || 'no owner'}</td>
        <td>${vehicle.Colour || 'no owner'}</td>
      `;
      tableBody.appendChild(row);


    });
    if (data.length == 0) {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.setAttribute('colspan', '6');
      cell.classList.add('no-data-found');
      cell.textContent = 'Vehicle registration not found';
      row.appendChild(cell);
      tableBody.appendChild(row);
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}
async function filterVehicle() {
  try {
    const input = document.getElementById('rego').value;
    await loadData(input);
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}
async function handleKeyPress(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    await filterVehicle();
  }
}
window.onload = filterVehicle;