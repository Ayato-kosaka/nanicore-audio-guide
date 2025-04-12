import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User, Provider } from '@supabase/supabase-js';
import { useLogger } from '@/hooks/useLogger';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  loading: boolean;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithOAuth: (provider: Provider) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * 🔐 認証状態と認証APIを提供するコンテキストプロバイダ。
 *
 * - `supabase.auth` によるセッション監視を行い、ログイン状態を保持
 * - 初期化時には `getSession()` を通じて状態を復元
 * - OAuth, メールログイン・サインアップ機能を提供
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { logFrontendEvent } = useLogger();

  useEffect(() => {
    /**
     * 🔐 初期セッションの復元 or 匿名ログイン。
     * - アプリ起動時に呼び出され、常にセッション状態を確認する。
     * - セッションがなければ匿名ログインを自動的に実施。
     * - Supabase Auth は永続化済みなので、基本的にセッションは復元される前提。
     */
    const initializeAuth = async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        const restoredSession = sessionData?.session;

        if (!restoredSession) {
          const { data: anonData, error: anonError } = await supabase.auth.signInAnonymously();

          logFrontendEvent({
            event_name: anonError ? 'signInFailed' : 'signInAnonymously',
            error_level: anonError ? 'error' : 'info',
            payload: anonError ? { message: anonError.message } : {},
          });

          if (anonData?.session) {
            setSession(anonData.session);
            setUser(anonData.session.user);
          }
        } else {
          logFrontendEvent({
            event_name: 'sessionRestored',
            error_level: 'info',
            payload: { user_id: restoredSession.user.id },
          });

          setSession(restoredSession);
          setUser(restoredSession.user);
        }
      } catch (err: any) {
        logFrontendEvent({
          event_name: 'authInitError',
          error_level: 'error',
          payload: { message: err.message },
        });
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    /**
     * 👀 認証状態のリアルタイム監視。
     * - ログイン/ログアウトなどのイベントを自動検出
     */
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // if (event === 'SIGNED_IN' && session) {
        //   setUser(session.user);
        //   setSession(session);
        //   router.replace('/');
        // } else if (event === 'SIGNED_OUT') {
        //   setUser(null);
        //   setSession(null);
        //   router.replace('/login');
        // }
        setUser(session?.user ?? null);

        logFrontendEvent({
          event_name: `onAuthStateChange:${event}`,
          error_level: 'debug',
          payload: { user_id: session?.user.id, event },
        });
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  /**
   * メールアドレスとパスワードでログインする。
   * @throws エラーが発生した場合は呼び出し元でキャッチする
   */
  const loginWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  /**
   * メールアドレスとパスワードでサインアップする。
   * @throws エラーが発生した場合は呼び出し元でキャッチする
   */
  const signUpWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  /**
   * OAuthプロバイダーでログインする。
   * @param provider - 'google' などのOAuthプロバイダー名
   */
  const signInWithOAuth = async (provider: Provider) => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) throw error;
  };

  /**
   * 現在のセッションをログアウトする。
   */
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
  };

  const value: AuthContextType = {
    user,
    session,
    isAuthenticated: !!user,
    loading,
    loginWithEmail,
    signUpWithEmail,
    logout,
    signInWithOAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * 🎣 `AuthContext` から認証状態と関数を取得するカスタムフック。
 * - `AuthProvider` 内でのみ使用可能。
 * - 使用場所が誤っている場合は例外を投げる。
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
