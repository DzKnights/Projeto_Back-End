import{ createCleint} from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseSecretKey = process.SUPABASE_SECRET_KEY!;

const supabase = createCleint (
    supabaseUrl,
    supabaseSecretKey,
);

export default supabase;