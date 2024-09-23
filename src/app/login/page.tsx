import { LoginForm } from './_components/login-form';
import { SocialLogins } from './_components/social-logins';

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="container">
        <LoginForm />
        <SocialLogins />
      </div>
    </div>
  );
}
