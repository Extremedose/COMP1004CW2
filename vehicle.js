import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xjmheuyoyvjlgfpfwdqs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqbWhldXlveXZqbGdmcGZ3ZHFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4NTIwMzgsImV4cCI6MjAyODQyODAzOH0.8EcuwtTxa14bvPlVBlW_cseIKi40jaBhp90OKT9P9kc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchData() {
    const { data, error } = await supabase
        .from('your_table_name')
        .select('*');

    if (error) {
        console.error('Error fetching data:', error.message);
    } else {
        console.log('Fetched data:', data);
    }
}

fetchData();
