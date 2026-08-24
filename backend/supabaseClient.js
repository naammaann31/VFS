const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

let supabase = null;
if (supabaseUrl && supabaseUrl.startsWith('http') && supabaseKey && supabaseKey !== 'your_supabase_anon_key') {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
  } catch (err) {
    console.warn('Supabase client initialization skipped:', err.message);
  }
}

async function saveLead(phoneNumber, leadData) {
  if (!supabase) {
    console.log('Supabase not configured; skipping lead insert.');
    return null;
  }
  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([
        { 
          phone: phoneNumber,
          name: leadData.name || '',
          country: leadData.ask_country || '',
          level: leadData.ask_level || '',
          intake: leadData.ask_intake || '',
          english: leadData.ask_english || '',
          contact_method: leadData.ask_contact || ''
        },
      ]);

    if (error) {
      console.error('Supabase Insert Error:', error);
      throw error;
    }
    console.log('Successfully saved lead to Supabase!');
    return data;
  } catch (err) {
    console.error('Error in saveLead:', err);
  }
}

module.exports = { saveLead };
