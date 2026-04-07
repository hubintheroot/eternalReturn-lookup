import type { User, Session } from '@supabase/supabase-js';
import type { MutableRefObject } from 'react';

export type { User, Session };

// ── Supabase Row Types ──────────────────────────────────────

export interface Character {
  CharacterID: number;
  Name_KR: string;
  Name_EN: string;
  Full_Name: string;
  Gender: string;
  Age: string;
  Height: string;
  Story_Desc: string;
  Story_Title: string;
  Difficulty: number;
  Weekly_Free: boolean;
}

export interface CharacterWithSkins extends Character {
  skins: Skin[];
}

export interface Skin {
  character_id: number;
  skin_id: number;
  name_kr: string;
  name_en: string;
  full_size: string | null;
  mini_size: string | null;
}

export interface Coupon {
  id: number;
  code: string;
  expires_at: string | null;
  name: string;
  description: string;
  is_active: boolean;
  created_by: string;
}

export interface CouponWithUsage extends Coupon {
  is_used: boolean;
}

export interface CouponInsert {
  name: string;
  code: string;
  description: string;
  expires_at: string | null;
  is_active: boolean;
}

export interface PatchNoteSummary {
  id: number;
  title: string;
  patch_date: string;
  view_count: number;
}

export interface SeasonInfo {
  season: number;
  isPre: boolean;
  isCurrent: boolean;
  start: string;
  end: string;
}

// ── Auth Types ──────────────────────────────────────────────

export interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
  autoSignedOut: boolean;
  signIn: (providerName?: string, options?: Record<string, unknown>) => Promise<unknown>;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  getSession: () => Promise<Session | null>;
  getUser: () => Promise<User | null>;
  clearAutoSignedOut: () => void;
}

// ── OAuth Provider Types ────────────────────────────────────

export interface OAuthProviderConfig {
  name: string;
  displayName: string;
  icon: string;
  scopes: string;
  config: {
    redirectTo: string;
  };
}

// ── UI Types ────────────────────────────────────────────────

export type ToastStatus = 'successed' | 'failed' | 'alert';

export interface ToastData {
  isShow: boolean;
  message: string | null;
  status: ToastStatus | null;
  timer: MutableRefObject<ReturnType<typeof setTimeout> | null>;
}

export interface ToastHandler {
  show: (data: { message: string; status: ToastStatus }) => void;
  hide: () => void;
  alert: (message: string) => void;
  success: (message: string) => void;
  failed: (message: string) => void;
}

export interface CouponHandler {
  setData: (data: Coupon[]) => void;
  isDuplicatedCoupon: (code: string) => boolean;
  isUsed: (coupon: Coupon) => void;
  toast: ToastHandler;
}

// ── Store Types ─────────────────────────────────────────────

export type SortState = 'release' | 'order';

export interface CharacterStore {
  data: CharacterWithSkins[] | null;
  setData: (data: CharacterWithSkins[] | null) => void;
}

export interface UserInfoStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export interface SeasonInfoStore {
  data: SeasonInfo | null;
  setSeasonInfo: (data: SeasonInfo | null) => void;
}

export interface SortOptionStore {
  isRotation: boolean;
  state: SortState;
  searchQuery: string;
  setIsRotation: (v: boolean) => void;
  setState: (v: SortState) => void;
  setSearchQuery: (v: string) => void;
}

export interface ImageLoadedStore {
  charListLoaded: boolean;
  detailLoaded: boolean;
  carouselHeight: number;
  setCharListLoaded: (v: boolean) => void;
  setCharDetailLoaded: (v: boolean) => void;
  setCarouselHeight: (v: number) => void;
}
