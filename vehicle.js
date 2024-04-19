const { createClient } = supabase

const _supabase = createClient('https://xjmheuyoyvjlgfpfwdqs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqbWhldXlveXZqbGdmcGZ3ZHFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4NTIwMzgsImV4cCI6MjAyODQyODAzOH0.8EcuwtTxa14bvPlVBlW_cseIKi40jaBhp90OKT9P9kc')

console.log('Supabase Instance: ', _supabase)

async function test(){

  const { data, error } = await _supabase
  .from("People")
  .update(inputFields)
  .eq("id", originalFields.id);
}
