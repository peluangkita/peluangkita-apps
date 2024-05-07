'use client'

import {useState} from 'react'
import Link from 'next/link'
// import LandingIntro from './LandingIntro'
// import ErrorText from  '../../components/Typography/ErrorText'
// import InputText from '../../components/Input/InputText'

function RegisterPage(){
    const [formValues, setFormValues] = useState({
        name:"",
        email: "",
        password: "",
        phone:""
      });
    //   const router = useRouter()
      const [loading, setLoading] = useState(false);
    //   const { data:session } = useSession()
    
      const handleSubmit = async (e) => {
        e.preventDefault()
        setFormValues({email: "", password: "" });
        setLoading(true)
    
        // signIn('credentials', {
        //   email : formValues.email,
        //   password : formValues.password, 
        //   redirect: false
        // })
        // .then((callback) => {
        //     if (callback?.error) {
        //       toast.error(callback.error)
        //       setLoading(false)
        //     }
    
        //     if(callback?.ok && !callback?.error) {
        //       setLoading(false)
        //       toast.success('Logged in successfully!')
        //       router.push("/")
        //     }
        // } )
    }
      
      const handleChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setFormValues({ ...formValues, [name]: value});
      }

    return(
        <div className='p-10'>
            <h2 className='text-[34px] font-bold mb-6 text-center text-primary'>Buat Akun</h2>
            <form onSubmit={handleSubmit}>

                <div className="mb-4">
                
                <div>
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-500"
                    >
                    Nama Lengkap
                    </label>
                
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="bg-white border border-black text-black sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                        placeholder="Nama Lengkap"
                        value={formValues.name}
                        onChange={handleChange}
                    />
                </div>

                <div className='my-4'>
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-500"
                    >
                    Email
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
                        htmlFor="phone"
                        className="block mb-2 text-sm font-medium text-gray-500"
                    >
                    Nomor Handphone
                    </label>
                
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        className="bg-white border border-black text-black sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                        placeholder="+62888XXXXXX"
                        value={formValues.phone}
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
                <button type="submit" className={"btn mt-2 w-full bg-primary text-white rounded-lg hover:bg-gray-800" + (loading ? " loading" : "")}>Daftar</button>

                <div className='text-center text-gray-500 mt-4'>Sudah memiliki akun? <Link href="/login"><span className=" inline-block text-primary font-bold hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Masuk di sini</span></Link></div>
            </form>
        </div>
    )
}

export default RegisterPage