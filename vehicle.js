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
        <td>${vehicle.People ? vehicle.People.Name || 'Not Known' : 'Not Known'}</td>
        <td>${vehicle.People ? vehicle.People.LicenseNumber || 'Not Known' : 'Not Known'}</td>
        <td>${vehicle.VehicleID || 'Not Known'}</td>
        <td>${vehicle.Make || 'Not Known'}</td>
        <td>${vehicle.Model || 'Not Known'}</td>
        <td>${vehicle.Colour || 'Not Known'}</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}
async function filterVehicle() {
  try {
    const input = document.getElementById('search_input_text').value;
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