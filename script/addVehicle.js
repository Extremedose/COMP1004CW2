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

    const addNameInput = document.getElementById('form-box-add-vehicle-inputs-name');
    let addName = addNameInput.value.trim();
    if (addName.includes(' ')) {
        addName = addName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    } else {
        addName = addName.charAt(0).toUpperCase() + addName.slice(1).toLowerCase();
    }
    const addAddress = document.getElementById('form-box-add-vehicle-inputs-address').value.charAt(0).toUpperCase() + document.getElementById('form-box-add-vehicle-inputs-address').value.slice(1).toLowerCase();
    const addLicenseNumber = document.getElementById('form-box-add-vehicle-inputs-licenseNumber').value;
    const addVehicleRegistration = document.getElementById('form-box-add-vehicle-inputs-vehicleRegistration').value.toUpperCase();
    const addDOB = document.getElementById('form-box-add-vehicle-inputs-dob').value;
    const addMake = document.getElementById('form-box-add-vehicle-inputs-make').value.charAt(0).toUpperCase() + document.getElementById('form-box-add-vehicle-inputs-make').value.slice(1).toLowerCase();
    const addModel = document.getElementById('form-box-add-vehicle-inputs-model').value;
    const addExpiryDate = document.getElementById('form-box-add-vehicle-inputs-expiryDate').value;
    const addColourInput = document.getElementById('form-box-add-vehicle-inputs-colour');

    let addColour = addColourInput.value.trim();
    if (addColour.includes(' ')) {
        addColour = addColour.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    } else {
        addColour = addColour.charAt(0).toUpperCase() + addColour.slice(1).toLowerCase();
    }
    if (addAddress == "") {
        alert("Missing input for Address");
        return;
    }
    if (addDOB == "") {
        alert("Missing input for Date Of Birth");
        return;
    }
    if (addLicenseNumber == "") {
        alert("Missing input for Licence Number");
        return;
    }
    if (addExpiryDate == "") {
        alert("Missing input for Expiry Date");
        return;
    }
    if (addVehicleRegistration == "") {
        alert("Missing input for Vehicle Registration");
        return;
    }
    if (addMake == "") {
        alert("Missing input for Make");
        return;
    }
    if (addModel == "") {
        alert("Missing input for Model");
        return;
    }
    if (addColour == "") {
        alert("Missing input for Colour");
        return;
    }

    try {
        const dataToCheck = addDOB.split("-");
        const today = new Date();

        if (dataToCheck[0] > today.getFullYear() || dataToCheck[0] == today.getFullYear() && dataToCheck[1] > (today.getMonth() + 1) || dataToCheck[0] == today.getFullYear() && dataToCheck[1] == (today.getMonth() + 1) && dataToCheck[2] > today.getDate()) {
            alert("Error: invalid Date of Birth");
            return;
        }

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
            alert("License Number is already registered under a different person");
            return;
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
            alert("Vehicle Registration is already registered under a different vehicle");
            return;
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
    } catch (error) {
        console.error('Error inserting data:', error.message);
    }

}

async function search() {
    const searchInput = document.getElementById("form-box-add-vehicle-inputs-name").value.toLowerCase();

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
        document.getElementById('form-box-add-vehicle-inputs-address').value = row.Address;
        document.getElementById('form-box-add-vehicle-inputs-dob').value = row.DOB;
        document.getElementById('form-box-add-vehicle-inputs-licenseNumber').value = row.LicenseNumber;
        document.getElementById('form-box-add-vehicle-inputs-expiryDate').value = row.ExpiryDate;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("form-box-add-vehicle-inputs-name");
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
