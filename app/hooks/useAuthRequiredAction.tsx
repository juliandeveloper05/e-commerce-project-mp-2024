// hooks/useAuthRequiredAction.tsx
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export const useAuthRequiredAction = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleAuthRequired = (action: string) => {
    toast(
      (t) => (
        <div className="flex items-center gap-3">
          <span>Debes iniciar sesión para {action}</span>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              router.push('/login');
            }}
            className="rounded-lg bg-purple-600 px-3 py-1 text-sm text-white hover:bg-purple-700"
          >
            Iniciar sesión
          </button>
        </div>
      ),
      {
        duration: 4000,
        position: 'bottom-right',
      },
    );
  };

  return {
    isAuthenticated: !!session,
    handleAuthRequired,
  } as const;
};

export type AuthRequiredActionReturn = {
  isAuthenticated: boolean;
  handleAuthRequired: (action: string) => void;
};

export type UseAuthRequiredAction = () => AuthRequiredActionReturn;
