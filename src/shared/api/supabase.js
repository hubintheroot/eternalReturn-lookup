import { createClient } from '@supabase/supabase-js';

const createSupabaseClient = () => {
  const options = {
    auth: {
      // 자동 토큰 갱신 활성화 (Supabase 내장)
      autoRefreshToken: true,
      // 세션 지속성 설정
      // false로 하면 localStorage에 저장 안 되지만 새로고침 시 로그아웃됨
      persistSession: true,
      // 세션 감지 활성화 (OAuth 콜백 처리)
      detectSessionInUrl: true,
      // PKCE 플로우 사용 (더 안전한 OAuth)
      flowType: 'pkce',
    },
  };

  return createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_PUBLIC_ANON_KEY,
    options,
  );
};

const client = createSupabaseClient();
export const supabase = () => client;

export const getCoupons = async () =>
  await supabase()
    .from('Coupons')
    .select('id, code, expires_at, name, description, is_active, created_by')
    .order('is_active', { ascending: false })
    .order('expires_at', { ascending: true });

export const getPatchNotes = async () =>
  await supabase()
    .from('patch_note_summaries')
    .select('id, title, patch_date, view_count')
    .order('patch_date', { ascending: false });

export const getPatchNoteById = async (id) =>
  await supabase()
    .from('patch_note_summaries')
    .select('*')
    .eq('id', id)
    .single();

export const incrementViewCount = async (articleId) =>
  await supabase().rpc('increment_view_count', { article_id: articleId });
