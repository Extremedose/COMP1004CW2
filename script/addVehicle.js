const { createClient } = supabase
const _supabase = createClient('https://xjmheuyoyvjlgfpfwdqs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqbWhldXlveXZqbGdmcGZ3ZHFzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMjg1MjAzOCwiZXhwIjoyMDI4NDI4MDM4fQ.jbCXYQ_eSysm4rGi5WDKu4e1UUnsmfSBrbC5VPHfV1Q')


async function getListOfName() {
    try {
        let { data, error } = await _supabase
            .from('People')
            .select('Name')
            .order('Name', { ascending: true });

        const datalist = document.getElementById('search-suggestions-name');
        datalist.innerHTML = '';

        if (data) {
            data.forEach(name => {
                const option = document.createElement('option');
                option.value = name.Name;
                datalist.appendChild(option);
            });
        }

    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

async function getListOfLicenseNumber() {
    try {
        let { data, error } = await _supabase
            .from('People')
            .select('LicenseNumber')
            .order('LicenseNumber', { ascending: true });

        const datalist = document.getElementById('search-suggestions-licenseNumber');
        datalist.innerHTML = '';

        if (data) {
            data.forEach(person => {
                const option = document.createElement('option');
                option.value = person.LicenseNumber;
                datalist.appendChild(option);
            });
        }

    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

async function nameToLicenseFill(name) {
    try {
        let { data, error } = await _supabase
            .from('People')
            .select('LicenseNumber')
            .eq('Name', name)

        const correspondinglicenseNumber = data.map(index => index.LicenseNumber);

        if (correspondinglicenseNumber) {
            const licenseNumber = document.getElementById('form-box-add-vehicle-inputs-licenseNumber');
            licenseNumber.value = correspondinglicenseNumber;
        }
    } catch (error) {

    }
}

async function licenseToNameFill(licenseNumber){
    try {
        let { data, error } = await _supabase
            .from('People')
            .select('Name')
            .eq('LicenseNumber', licenseNumber)

        const correspondingName = data.map(index => index.Name);
        if (correspondingName) {
            const name = document.getElementById('form-box-add-vehicle-inputs-name');
            name.value = correspondingName;
        }
    } catch (error) {

    }
}

const inputFieldName = document.getElementById('form-box-add-vehicle-inputs-name');
inputFieldName.addEventListener('input', function () {
    if (this.value != '') {
        nameToLicenseFill(this.value);
    }
});

const inputFieldlicense = document.getElementById('form-box-add-vehicle-inputs-licenseNumber');
inputFieldlicense.addEventListener('input', function () {
    if (this.value != '') {
        licenseToNameFill(this.value);
    }
});


getListOfName();
getListOfLicenseNumber();

