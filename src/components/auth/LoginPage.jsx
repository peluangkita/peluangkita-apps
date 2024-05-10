'use client'

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect} from "react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

function LoginPage(){
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
      });
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    //   const { data:session } = useSession()
    
      const handleSubmit = async (e) => {
        e.preventDefault()
        setFormValues({email: "", password: "" });
        setLoading(true)
    
        signIn('credentials', {
          email : formValues.email,
          password : formValues.password, 
          redirect: false
        })
        .then((callback) => {
            if (callback?.error) {
              toast.error(callback.error)
              setLoading(false)
            }
    
            if(callback?.ok && !callback?.error) {
              setLoading(false)
              toast.success('Logged in successfully!')
              router.push("/")
            }
        } )
    }
      
      const handleChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setFormValues({ ...formValues, [name]: value});
      }

    return(
        <div className='lg:p-10'>
            <h2 className='text-[34px] font-bold mb-6 text-center text-primary'>Login</h2>
            <form onSubmit={handleSubmit}>

                <div className="mb-4">
                <div>
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-500"
                    >
                    Masukan email kamu
                    </label>
                
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-white border border-black text-black sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                        placeholder="name@company.com"
                        value={formValues.email}
                        onChange={handleChange}
                    />
                </div>
                <div className='my-4'>
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-500"
                    >
                    Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-white border border-black text-black sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        value={formValues.password}
                        onChange={handleChange}
                    />
                    
                </div>

                </div>

                {/* <div className='text-right text-primary'><Link to="/forgot-password"><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Lupa Password?</span></Link>
                </div> */}

                {/* <ErrorText styleClass="mt-8">{errorMessage}</ErrorText> */}
                {/* <button type="submit" className={"btn mt-2 w-full bg-primary text-white rounded-lg hover:bg-gray-800" + (loading ? " loading" : "")}>Login</button> */}
                {loading ? (
                <button
                    disabled
                    type="button"
                    className="w-full text-white text-xs bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
                >
                    <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 mr-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                    />
                    </svg>
                    Mohon tunggu...
                </button>
                ) : (
                <button
                    type="submit"
                    className="w-full text-white bg-primary hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Masuk
                </button>
                )}

                <div className='text-center text-gray-500 mt-4'>Belum memiliki akun? <Link href="/register"><span className=" inline-block text-primary font-bold hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Daftar di sini</span></Link></div>
            </form>
        </div>
    )
}

export default LoginPage