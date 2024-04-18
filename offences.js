
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://xjmheuyoyvjlgfpfwdqs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqbWhldXlveXZqbGdmcGZ3ZHFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4NTIwMzgsImV4cCI6MjAyODQyODAzOH0.8EcuwtTxa14bvPlVBlW_cseIKi40jaBhp90OKT9P9kc')

function test(){

    

    async function fetchData() {
    const { data, error } = await supabase.from('People').select('*');
    if (error) {
      console.error('Error fetching data:', error.message);
    } else {
      console.log('Fetched data:', data);
      // Do something with the fetched data
    }
  }

}
