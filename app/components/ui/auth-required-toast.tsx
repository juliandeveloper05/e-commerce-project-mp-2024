// components/ui/auth-required-toast.tsx
interface AuthRequiredToastProps {
  action: string;
  onLogin: () => void;
}

const AuthRequiredToast = ({ action, onLogin }: AuthRequiredToastProps) => (
  <div className="flex items-center gap-3">
    <span>Debes iniciar sesión para {action}</span>
    <button
      onClick={onLogin}
      className="rounded-lg bg-purple-600 px-3 py-1 text-sm text-white hover:bg-purple-700"
    >
      Iniciar sesión
    </button>
  </div>
);

export default AuthRequiredToast;
