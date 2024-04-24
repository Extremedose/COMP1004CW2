const { createClient } = supabase
const _supabase = createClient('https://xjmheuyoyvjlgfpfwdqs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqbWhldXlveXZqbGdmcGZ3ZHFzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMjg1MjAzOCwiZXhwIjoyMDI4NDI4MDM4fQ.jbCXYQ_eSysm4rGi5WDKu4e1UUnsmfSBrbC5VPHfV1Q')


const addName = document.getElementById('form-box-add-vehicle-inputs-name').value;
const addAddress = document.getElementById('form-box-add-vehicle-inputs-address').value.charAt(0).toUpperCase() + document.getElementById('form-box-add-vehicle-inputs-address').value.slice(1).toLowerCase();
const addLicenseNumber = document.getElementById('form-box-add-vehicle-inputs-licenseNumber').value;
const addVehicleRegistration = document.getElementById('form-box-add-vehicle-inputs-vehicleRegistration').value.toUpperCase();
const addDOB = document.getElementById('form-box-add-vehicle-inputs-dob').value;
const addMake = document.getElementById('form-box-add-vehicle-inputs-make').value.charAt(0).toUpperCase() + document.getElementById('form-box-add-vehicle-inputs-make').value.slice(1).toLowerCase();
const addModel = document.getElementById('form-box-add-vehicle-inputs-model').value;
const addColour = document.getElementById('form-box-add-vehicle-inputs-colour').value.charAt(0).toUpperCase() + document.getElementById('form-box-add-vehicle-inputs-colour').value.slice(1).toLowerCase();
const addExpiryDate = document.getElementById('form-box-add-vehicle-inputs-expiryDate').value;

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

    try {
        const dataToCheck = addDOB.split("-");
        console.log(dataToCheck[0]);
        console.log(dataToCheck[1]);
        console.log(dataToCheck[2]);

        const today = new Date();

        if (dataToCheck[0] > today.getFullYear() || dataToCheck[0] == today.getFullYear() && dataToCheck[1] > (today.getMonth() + 1) || dataToCheck[0] == today.getFullYear() && dataToCheck[1] == (today.getMonth() + 1) && dataToCheck[2] > today.getDate()) {
            alert("Error: invalid Date of Birth");
            return;
        }
    } catch {
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
    dropdownOptions.innerHTML = ""; // Clear previous options

    if (searchInput && filteredData.length > 0) {
        filteredData.forEach(option => {
            const optionElement = document.createElement("li");
            optionElement.textContent = option[Object.keys(option)[1]];
            optionElement.classList.add("dropdown-option");

            optionElement.addEventListener("click", () => {
                console.log("Clicked:", option[Object.keys(option)[1]]);
                document.getElementById("form-box-add-vehicle-inputs-name").value = option[Object.keys(option)[1]];
                dropdownOptions.innerHTML = "";
            });

            dropdownOptions.appendChild(optionElement);
        });
    } else {
        const message = document.createElement("li");
        message.textContent = "No suggestions found";
        message.classList.add("dropdown-message");
        dropdownOptions.appendChild(message);
    }
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

        dropdownOptions.innerHTML = ""; // Clear previous options

        if (searchInputValue && filteredData.length > 0) {
            filteredData.forEach(option => {
                const optionElement = document.createElement("li");
                optionElement.textContent = option[Object.keys(option)[1]];
                optionElement.classList.add("dropdown-option");

                optionElement.addEventListener("click", () => {
                    console.log("Clicked:", option[Object.keys(option)[1]]);
                    searchInput.value = option[Object.keys(option)[1]];
                    dropdownOptions.innerHTML = "";
                });

                dropdownOptions.appendChild(optionElement);
            });
            document.getElementById("dropdownOptions").style.display = "block";
        } else {
            const message = document.createElement("li");
            message.textContent = "No suggestions found";
            message.classList.add("dropdown-message");
            dropdownOptions.appendChild(message);
            document.getElementById("dropdownOptions").style.display = "none";
        }
    });

    // Hide dropdown when clicked outside of input or dropdown
    document.addEventListener("click", (event) => {
        if (!searchInput.contains(event.target) && !dropdownOptions.contains(event.target)) {
            dropdownOptions.innerHTML = "";
            document.getElementById("dropdownOptions").style.display = "none";
        }
    });

    // Hide dropdown when the page loads
    document.getElementById("dropdownOptions").style.display = "none";
});
