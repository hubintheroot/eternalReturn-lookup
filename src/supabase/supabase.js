import { createClient } from "@supabase/supabase-js";

const client = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_PUBLIC_ANON_KEY
);
export const supabase = () => client;

export const getCoupons = async () =>
  await supabase()
    .from("Coupons")
    .select("id, code, expires_at, name, description, is_active, created_by")
    .order("is_active", { ascending: false })
    .order("expires_at", { ascending: true });
