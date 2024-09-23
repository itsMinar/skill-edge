import { LoginForm } from './_components/login-form';

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="container">
        <LoginForm />
      </div>
    </div>
  );
}
