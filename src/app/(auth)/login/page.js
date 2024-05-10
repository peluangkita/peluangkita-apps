import LoginForm from '@/components/auth/LoginPage';
import Image from 'next/image';
import Link from 'next/link';
export default function Login() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center mx-6">
      <div className="card mx-auto w-full max-w-5xl bg-white shadow-xl rounded-xl">
        <div className="grid md:grid-cols-2 grid-cols-1 ">
          <div className="flex flex-col rounded-xl bg-primary p-4 justify-center items-center">
            <h1 className="text-gray-100">Selamat Datang di</h1>
            <Link href="/">
              <Image
                src="/Logo-White.png"
                width={250}
                height={100}
                className="w-44 lg:w-full mt-4"
              />
            </Link>
          </div>
          <div className="p-6">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
