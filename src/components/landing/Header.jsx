// import { HEADER_NAV } from "../lib/navigations"
import Link from "next/link"
import Image from 'next/image'
import { RiArrowDownSLine, RiShoppingBasket2Fill } from "react-icons/ri"

export default function HeaderLanding() {
    return (
        <div className="border-b border-b-gray-300 bg-gradient-to-r from-primary from-30% via-secondary via-50% to-tersier to-90%">
            <div className="navbar py-0 p-4 layout-w max-w-[78rem] mx-auto">
                <div className="navbar-start py-4">
                    <Link href={"/"} className="flex items-center gap-2 text-secondary text-xl font-semibold">
                        <Image src="/Logo-White.png" width={200} height={100} alt="Peluang"/>
                    </Link>
                </div>
                {/* <div className="navbar-center">
                    <div className="join w-[30rem]">
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Search Product..."
                            className="w-full join-item input  input-bordered input-sm"
                        />
                        <div className="dropdown dropdown-hover join-item">
                            <label
                                tabIndex={0}
                                className="w-[7rem] px-1 btn btn-sm btn-outline border-gray-300 rounded-none capitalize"
                            >
                                Category <RiArrowDownSLine />
                            </label>
                            <ul
                                tabIndex={0}
                                className="dropdown-content z-[1] menu p-1 text-gray-500 shadow border border-gray-300 bg-base-100 rounded-lg w-52"
                            >
                                <li>
                                    <a>Electronic</a>
                                </li>
                                <li>
                                    <a>Home Furniture</a>
                                </li>
                            </ul>
                        </div>
                        <button className="btn btn-sm btn-secondary join-item rounded-r-lg capitalize">Search</button>
                    </div>
                </div> */}
                <div className="navbar-end gap-1">
                    {/* {HEADER_NAV.map((nav) => (
                        <Link
                            key={nav.path}
                            href={nav.path}
                            className="flex flex-col items-center text-gray-500 rounded-lg p-2 min-w-[4rem] gap-1 hover:opacity-80 transition-opacity"
                        >
                            <div className="indicator">
                                {nav.path === "/cart" && (
                                    <span className="indicator-item px-1 text-xs font-semibold badge badge-secondary">
                                        2
                                    </span>
                                )}
                                {nav.icon}
                            </div>
                            <span className="text-xs">{nav.label}</span>
                        </Link>
                    ))} */}

                    <Link href="/login" className="text-gray-100 px-6 py-2">
                        <button> Masuk </button>
                    </Link>
                    <Link href="/register" className="bg-white text-primary px-6 py-2 rounded-lg">
                        <button> Daftar </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

