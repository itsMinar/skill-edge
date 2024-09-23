import { RegistrationForm } from '../_components/registration-form';

type RegisterPageProps = {
  params: {
    role: string;
  };
};

export default function RegisterPage({ params: { role } }: RegisterPageProps) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="container">
        <RegistrationForm role={role} />
      </div>
    </div>
  );
}
