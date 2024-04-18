document.addEventListener('DOMContentLoaded', async function () {
    const supabase = createClient('https://xjmheuyoyvjlgfpfwdqs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqbWhldXlveXZqbGdmcGZ3ZHFzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMjg1MjAzOCwiZXhwIjoyMDI4NDI4MDM4fQ.jbCXYQ_eSysm4rGi5WDKu4e1UUnsmfSBrbC5VPHfV1Q');
    
    try {
        const { data, error } = await supabase.from('People').select('*');
        if (error) {
            console.error(error);
            return;
        }
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
});