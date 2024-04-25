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
    
    let smallElement1 = document.querySelector('.form-box-add-vehicle-item1 small');
    let smallElement2 = document.querySelector('.form-box-add-vehicle-item2 small');
    let smallElement3 = document.querySelector('.form-box-add-vehicle-item3 small');
    let smallElement4 = document.querySelector('.form-box-add-vehicle-item4 small');
    let smallElement5 = document.querySelector('.form-box-add-vehicle-item5 small');
    let smallElement6 = document.querySelector('.form-box-add-vehicle-item6 small');
    let smallElement7 = document.querySelector('.form-box-add-vehicle-item7 small');
    let smallElement8 = document.querySelector('.form-box-add-vehicle-item8 small');
    let smallElement9 = document.querySelector('.form-box-add-vehicle-item9 small');

    let errors = 0;

    if (addName === "") {
        smallElement1.textContent = "Name is required";
        smallElement1.style.visibility = "visible";
        errors++;
    } else {
        smallElement1.style.visibility = "hidden";
    }
    if (addAddress === "") {
        smallElement2.textContent = "Address is required";
        smallElement2.style.visibility = "visible";
        errors++;
    } else {
        smallElement2.style.visibility = "hidden";
    }
    if (addDOB === "") {
        smallElement3.textContent = "Date of Birth is required";
        smallElement3.style.visibility = "visible";
        errors++;
    } else {
        smallElement3.style.visibility = "hidden";
    }
    if (addLicenseNumber === "") {
        smallElement4.textContent = "License Number is required";
        smallElement4.style.visibility = "visible";
        errors++;
    } else {
        smallElement4.style.visibility = "hidden";
    }
    if (addExpiryDate === "") {
        smallElement5.textContent = "Expiry Date is required";
        smallElement5.style.visibility = "visible";
        errors++;
    } else {
        smallElement5.style.visibility = "hidden";
    }
    if (addVehicleRegistration === "") {
        smallElement6.textContent = "Vehicle Registration is required";
        smallElement6.style.visibility = "visible";
        errors++;
    } else {
        smallElement6.style.visibility = "hidden";
    }
    if (addMake === "") {
        smallElement7.textContent = "Make is required";
        smallElement7.style.visibility = "visible";
        errors++;
    } else {
        smallElement7.style.visibility = "hidden";
    }
    if (addModel === "") {
        smallElement8.textContent = "Model is required";
        smallElement8.style.visibility = "visible";
        errors++;
    } else {
        smallElement8.style.visibility = "hidden";
    }
    if (addColour === "") {
        smallElement9.textContent = "Colour is required";
        smallElement9.style.visibility = "visible";
        errors++;
    } else {
        smallElement9.style.visibility = "hidden";
    }

    if(errors){
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
