import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export type UserRole = 'admin' | 'manager' | 'staff' | 'user';

interface AuthState {
  user: any | null;
  session: any | null;
  role: UserRole | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, fullName: string) => Promise<any>;
  signOut: () => Promise<void>;
  hasPermission: (requiredRole: UserRole) => boolean;
}

const roleHierarchy: Record<UserRole, number> = {
  admin: 4,
  manager: 3,
  staff: 2,
  user: 1,
};

const determineRole = (email: string): UserRole => {
  const emailLower = email.toLowerCase();
  if (emailLower.includes('admin')) return 'admin';
  if (emailLower.includes('manager')) return 'manager';
  if (emailLower.includes('staff')) return 'staff';
  return 'user';
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  role: null,
  loading: true,

  signIn: async (email: string, password: string) => {
    try {
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

      if (error || !user) {
        throw new Error('Invalid credentials');
      }

      set({ 
        user, 
        session: { user }, 
        role: user.role as UserRole 
      });
      
      return user;
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  },

  signUp: async (email: string, password: string, fullName: string) => {
    try {
      const role = determineRole(email);
      const userId = uuidv4();
      const now = new Date().toISOString();

      const { data: newUser, error } = await supabase
        .from('users')
        .insert([{
          id: userId,
          email,
          password,
          full_name: fullName,
          role,
          active: true,
          created_at: now,
          updated_at: now
        }])
        .select()
        .single();

      if (error) {
        console.error('Signup error:', error);
        throw new Error('Failed to create account');
      }

      set({ 
        user: newUser, 
        session: { user: newUser }, 
        role: newUser.role as UserRole 
      });

      return newUser;
    } catch (error) {
      console.error('Signup error:', error);
      throw new Error('Failed to create account');
    }
  },

  signOut: async () => {
    set({ user: null, session: null, role: null });
  },

  hasPermission: (requiredRole: UserRole) => {
    const currentRole = get().role;
    if (!currentRole) return false;
    return roleHierarchy[currentRole] >= roleHierarchy[requiredRole];
  },
}));