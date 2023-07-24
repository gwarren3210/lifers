import { createClient } from '@supabase/supabase-js'
import sKey from './env.js'

const supabaseUrl = 'https://esrodeumkeukhwzrmftd.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const testKey = process.env.RANDOM_KEY
console.log("Test Key: ", testKey)
console.log("ENV var: ", process.env)

const supabase = createClient(supabaseUrl, sKey)
export default supabase;