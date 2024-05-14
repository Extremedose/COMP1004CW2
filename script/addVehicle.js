const { createClient } = supabase
const _supabase = createClient('https://xjmheuyoyvjlgfpfwdqs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqbWhldXlveXZqbGdmcGZ3ZHFzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMjg1MjAzOCwiZXhwIjoyMDI4NDI4MDM4fQ.jbCXYQ_eSysm4rGi5WDKu4e1UUnsmfSBrbC5VPHfV1Q')

async function fetchOptions() {
    try {
        const { data, error } = await _supabase
            .from('People')
            .select('*')
            .order('PersonID', { ascending: true });
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        console.error('Error fetching options:', error.message);
        return [];
    }
}
async function sanityCheck() {
    const addNameInput = document.getElementById('name');
    let addName = addNameInput.value.trim();
    if (addName.includes(' ')) {
        addName = addName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    } else {
        addName = addName.charAt(0).toUpperCase() + addName.slice(1).toLowerCase();
    }
    const addAddress = document.getElementById('address').value.charAt(0).toUpperCase() + document.getElementById('address').value.slice(1).toLowerCase();
    const addLicenseNumber = document.getElementById('license').value;
    const addVehicleRegistration = document.getElementById('rego').value.toUpperCase();
    const addDOB = document.getElementById('dob').value;
    const addMake = document.getElementById('make').value.charAt(0).toUpperCase() + document.getElementById('make').value.slice(1).toLowerCase();
    const addModel = document.getElementById('model').value;
    const addExpiryDate = document.getElementById('expire').value;
    const addColourInput = document.getElementById('colour');

    let addColour = addColourInput.value.trim();
    if (addColour.includes(' ')) {
        addColour = addColour.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    } else {
        addColour = addColour.charAt(0).toUpperCase() + addColour.slice(1).toLowerCase();
    }
    const dataToCheck = addDOB.split("-");
    const today = new Date();

    let errors = 0;
    if (addName === "") {
        document.querySelector('.form-box-add-vehicle-item1 small').textContent = "Name is required";
        document.querySelector('.form-box-add-vehicle-item1 small').style.visibility = "visible";
        document.querySelector('#name').style.border = "Solid Red 2px";
        errors++;
    } else {
        document.querySelector('.form-box-add-vehicle-item1 small').style.visibility = "hidden";
    }
    if (addAddress === "") {
        document.querySelector('.form-box-add-vehicle-item2 small').textContent = "Address is required";
        document.querySelector('.form-box-add-vehicle-item2 small').style.visibility = "visible";
        document.querySelector('#address').style.border = "Solid Red 2px";
        errors++;
    } else {
        document.querySelector('.form-box-add-vehicle-item2 small').style.visibility = "hidden";
    }
    if (addDOB === "") {
        document.querySelector('.form-box-add-vehicle-item3 small').textContent = "Date of Birth is required";
        document.querySelector('.form-box-add-vehicle-item3 small').style.visibility = "visible";
        document.querySelector('#dob').style.border = "Solid Red 2px";
        errors++;
    } else if (dataToCheck[0] > today.getFullYear() || dataToCheck[0] == today.getFullYear() && dataToCheck[1] > (today.getMonth() + 1) || dataToCheck[0] == today.getFullYear() && dataToCheck[1] == (today.getMonth() + 1) && dataToCheck[2] > today.getDate()) {
        document.querySelector('.form-box-add-vehicle-item3 small').textContent = "Invalid Date";
        document.querySelector('.form-box-add-vehicle-item3 small').style.visibility = "visible";
        document.querySelector('#dob').style.border = "Solid Red 2px";
        errors++;
    } else {
        document.querySelector('.form-box-add-vehicle-item3 small').style.visibility = "hidden";
    }
    if (addLicenseNumber === "") {
        document.querySelector('.form-box-add-vehicle-item4 small').textContent = "License Number is required";
        document.querySelector('.form-box-add-vehicle-item4 small').style.visibility = "visible";
        document.querySelector('#license').style.border = "Solid Red 2px";
        errors++;
    } else {
        document.querySelector('.form-box-add-vehicle-item4 small').style.visibility = "hidden";
    }
    if (addExpiryDate === "") {
        document.querySelector('.form-box-add-vehicle-item5 small').textContent = "Expiry Date is required";
        document.querySelector('.form-box-add-vehicle-item5 small').style.visibility = "visible";
        document.querySelector('#expire').style.border = "Solid Red 2px";
        errors++;
    } else {
        document.querySelector('.form-box-add-vehicle-item5 small').style.visibility = "hidden";
    }
    if (addVehicleRegistration === "") {
        document.querySelector('.form-box-add-vehicle-item6 small').textContent = "Vehicle Registration is required";
        document.querySelector('.form-box-add-vehicle-item6 small').style.visibility = "visible";
        document.querySelector('#rego').style.border = "Solid Red 2px";
        errors++;
    } else {
        document.querySelector('.form-box-add-vehicle-item6 small').style.visibility = "hidden";
    }
    if (addMake === "") {
        document.querySelector('.form-box-add-vehicle-item7 small').textContent = "Make is required";
        document.querySelector('.form-box-add-vehicle-item7 small').style.visibility = "visible";
        document.querySelector('#make').style.border = "Solid Red 2px";
        errors++;
    } else {
        document.querySelector('.form-box-add-vehicle-item7 small').style.visibility = "hidden";
    }
    if (addModel === "") {
        document.querySelector('.form-box-add-vehicle-item8 small').textContent = "Model is required";
        document.querySelector('.form-box-add-vehicle-item8 small').style.visibility = "visible";
        document.querySelector('#model').style.border = "Solid Red 2px";
        errors++;
    } else {
        document.querySelector('.form-box-add-vehicle-item8 small').style.visibility = "hidden";
    }
    if (addColour === "") {
        document.querySelector('.form-box-add-vehicle-item9 small').textContent = "Colour is required";
        document.querySelector('.form-box-add-vehicle-item9 small').style.visibility = "visible";
        document.querySelector('#colour').style.border = "Solid Red 2px";
        errors++;
    } else {
        document.querySelector('.form-box-add-vehicle-item9 small').style.visibility = "hidden";
    }
    if (errors) {
        return;
    }
    try {
        const data = await fetchOptions();
        let nextPersonID = 0;
        let personExists = 0;
        let selectedPersonID;
        const matchingRow = data.filter(row => {
            if (row.PersonID > nextPersonID) {
                nextPersonID = row.PersonID;
            }
            if (row.Name === addName && row.Address === addAddress && row.DOB === addDOB &&
                row.LicenseNumber === addLicenseNumber && row.ExpiryDate === addExpiryDate) {

                personExists = 1;
                selectedPersonID = row.PersonID;
            }
        });
        nextPersonID = nextPersonID + 1;
        if (personExists) {
            insertVehicle(selectedPersonID, addVehicleRegistration, addMake, addModel, addColour);

        } else {
            insertPerson(nextPersonID, addName, addAddress, addLicenseNumber, addDOB, addExpiryDate, addVehicleRegistration, addMake, addModel, addColour);
        }
    } catch {
    }
}
async function insertPerson(newPersonID, newName, newAddress, newLicenseNumber, newDOB, newExpiryDate, newVehicleRegistration, newMake, newModel, newColour) {
    try {
        const { data, error } = await _supabase
            .from('People')
            .select('*')
            .filter('LicenseNumber', 'eq', newLicenseNumber);
        if (error) {
            throw error;
        }
        if (data.length > 0) {
            document.querySelector('.form-box-add-vehicle-item4 small').textContent = "License Number is already registered under a different person";
            document.querySelector('.form-box-add-vehicle-item4 small').style.visibility = "visible";
            return;
        } else {
            document.querySelector('.form-box-add-vehicle-item4 small').style.visibility = "hidden";
        }
        const { data: insertedData, error: insertError } = await _supabase
            .from('People')
            .insert([
                {
                    PersonID: newPersonID,
                    Name: newName,
                    Address: newAddress,
                    LicenseNumber: newLicenseNumber,
                    DOB: newDOB,
                    ExpiryDate: newExpiryDate
                }
            ]);
        if (insertedData) {
            throw insertedData;
        }
        console.log("Person added successfully", insertedData);
    } catch (error) {
        console.error('Error inserting data:', error.message);
    }
    insertVehicle(newPersonID, newVehicleRegistration, newMake, newModel, newColour);
}
async function insertVehicle(ownerID, newVehicleRegistration, newMake, newModel, newColour) {
    try {
        const { data, error } = await _supabase
            .from('Vehicle')
            .select('VehicleID')
            .filter('VehicleID', 'eq', newVehicleRegistration);

        if (error) {
            throw error;
        }
        if (data.length > 0) {
            document.querySelector('.form-box-add-vehicle-item6 small').textContent = "Vehicle Registration is already registered under a different vehicle";
            document.querySelector('.form-box-add-vehicle-item6 small').style.visibility = "visible";
            return;
        } else {
            document.querySelector('.form-box-add-vehicle-item6 small').style.visibility = "hidden";
        }
        const { data: insertedData, error: insertError } = await _supabase
            .from('Vehicle')
            .insert([
                {
                    VehicleID: newVehicleRegistration,
                    Make: newMake,
                    Model: newModel,
                    Colour: newColour,
                    OwnerID: ownerID
                }
            ]);
        if (insertError) {
            throw insertError;
        }
        console.log("Vehicle added successfully", insertedData);
        document.getElementById('success-message').style.visibility = 'visible';
        setTimeout(function () {
            document.getElementById('success-message').style.visibility = 'hidden';
            clearForm();
        }, 3000);

    
    } catch (error) {
        console.error('Error inserting data:', error.message);
    }
}
function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('address').value = '';
    document.getElementById('license').value = '';
    document.getElementById('rego').value = '';
    document.getElementById('dob').value = '';
    document.getElementById('make').value = '';
    document.getElementById('model').value = '';
    document.getElementById('expire').value = '';
    document.getElementById('colour').value = '';

    document.querySelectorAll('.form-box-add-vehicle-item small').forEach(function (error) {
        error.textContent = '';
        error.style.visibility = 'hidden';
    });
    document.querySelectorAll('#name,\
                            #address,\
                            #license,\
                            #rego,\
                            #dob,\
                            #make,\
                            #model,\
                            #expire,\
                            #colour'
    ).forEach(function (input) {

        input.style.border = '';
    });
}
async function search() {
    const searchInput = document.getElementById("name").value.toLowerCase();
    const data = await fetchOptions();
    const filteredData = data.filter(option => {
        const name = option[Object.keys(option)[1]].toLowerCase();
        return name.includes(searchInput);
    });

    const dropdownOptions = document.getElementById("dropdownOptions").querySelector("ul");
    dropdownOptions.innerHTML = "";
}

async function populateForm(selectedName) {
    const data = await fetchOptions();
    const matchingRow = data.filter(row => row.Name === selectedName);
    matchingRow.forEach(row => {
        document.getElementById('address').value = row.Address;
        document.getElementById('dob').value = row.DOB;
        document.getElementById('license').value = row.LicenseNumber;
        document.getElementById('expire').value = row.ExpiryDate;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("name");
    const dropdownOptions = document.getElementById("dropdownOptions").querySelector("ul");

    searchInput.addEventListener("input", async () => {
        const searchInputValue = searchInput.value.toLowerCase();

        const data = await fetchOptions();
        const filteredData = data.filter(option => {
            const name = option[Object.keys(option)[1]].toLowerCase();
            return name.includes(searchInputValue);
        });
        dropdownOptions.innerHTML = "";
        if (searchInputValue && filteredData.length > 0) {
            filteredData.forEach(option => {
                const optionElement = document.createElement("li");
                optionElement.textContent = option[Object.keys(option)[1]];
                optionElement.classList.add("dropdown-option");

                optionElement.addEventListener("click", () => {
                    populateForm(option[Object.keys(option)[1]]);
                    searchInput.value = option[Object.keys(option)[1]];
                    dropdownOptions.innerHTML = "";
                });
                dropdownOptions.appendChild(optionElement);
            });
            document.getElementById("dropdownOptions").style.display = "block";
        } else {
            document.getElementById("dropdownOptions").style.display = "none";
        }
    });
    document.addEventListener("click", (event) => {
        if (!searchInput.contains(event.target) && !dropdownOptions.contains(event.target)) {
            dropdownOptions.innerHTML = "";
            document.getElementById("dropdownOptions").style.display = "none";
        }
    });

    document.getElementById("dropdownOptions").style.display = "none";
});
