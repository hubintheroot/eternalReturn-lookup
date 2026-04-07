import { createClient } from '@supabase/supabase-js';
import type { Coupon, PatchNoteSummary, Character, Skin } from '@/shared/types';

const createSupabaseClient = () => {
  const options = {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce' as const
    }
  };
  return createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLIC_ANON_KEY, options);
};
const client = createSupabaseClient();
export const supabase = () => client;
export const getCoupons = async () => await supabase().from('Coupons').select('id, code, expires_at, name, description, is_active, created_by').order('is_active', {
  ascending: false
}).order('expires_at', {
  ascending: true
}).returns<Coupon[]>();
export const getPatchNotes = async () => await supabase().from('patch_note_summaries').select('id, title, patch_date, view_count').order('patch_date', {
  ascending: false
}).returns<PatchNoteSummary[]>();
export const getPatchNoteById = async (id: number) => await supabase().from('patch_note_summaries').select('*').eq('id', id).single();
export const incrementViewCount = async (articleId: number) => await supabase().rpc('increment_view_count', {
  article_id: articleId
});
export const getCharacterImageMap = async (): Promise<Record<string, string>> => {
  const [chars, skins] = await Promise.all([supabase().from('Characters').select('CharacterID, Name_KR').returns<Pick<Character, 'CharacterID' | 'Name_KR'>[]>(), supabase().from('Skins').select('character_id, mini_size').not('mini_size', 'is', null).order('skin_id', {
    ascending: true
  }).returns<Pick<Skin, 'character_id' | 'mini_size'>[]>()]);
  if (!chars.data || !skins.data) return {};
  const map: Record<string, string> = {};
  chars.data.forEach(c => {
    const skin = skins.data.find(s => s.character_id === c.CharacterID);
    if (skin?.mini_size) map[c.Name_KR] = skin.mini_size;
  });
  return map;
};
