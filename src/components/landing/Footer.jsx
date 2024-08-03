import Link from "next/link"
import Image from "next/image"
import React from "react"
import {
    RiFacebookCircleFill,
    RiInstagramLine,
    RiLinkedinFill,
    RiMapPinLine,
    RiMessage2Line,
    RiPhoneLine,
    RiTwitterFill,
    RiInstagramFill
} from "react-icons/ri"

export default function Footer() {
    return (
        <footer className="bg-gradient-to-b lg:bg-gradient-to-r from-primary from-30% via-secondary via-50% to-tersier to-90% border-t border-t-gray-300 mt-20">
            <div className="max-w-[78rem] mx-auto px-6 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-12">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div>
                        <div className="flex justify-start text-left text-white">
                            <Link href={"/"} className="flex items-center gap-2 text-white text-xl font-semibold">
                                <Image src="/Logo-White.png" width={150} height={auto} className="w-40" alt="peluangkita"  />
                            </Link>
                        </div>

                        <p className="mt-6 max-w-md text-left leading-relaxed text-gray-100 sm:max-w-xs">
                            PeluangKita.com adalah platform digital bagi para kandidat yang ingin mengikuti kelas atau
                            kursus secara online.
                        </p>

                        <ul className="mt-4 md:mt-8 flex justify-start gap-6 md:gap-8">
                            <li>
                                <Link href="#">
                                    <RiFacebookCircleFill
                                        fontSize={26}
                                        className="text-white transition hover:text-white/75"
                                    />
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <RiInstagramLine
                                        fontSize={26}
                                        className="text-white transition hover:text-white/75"
                                    />
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <RiLinkedinFill
                                        fontSize={26}
                                        className="text-white transition hover:text-white/75"
                                    />
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <RiTwitterFill
                                        fontSize={26}
                                        className="text-white transition hover:text-white/75"
                                    />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
                        <div className="text-left">
                            <p className="text-lg font-medium text-white">Tentang Kami</p>

                            <ul className="mt-4 md:mt-8 space-y-4 text-sm">
                                <li>
                                    <Link className="text-gray-100 transition hover:text-gray-100/75" href="/">
                                        Peluangkita
                                    </Link>
                                </li>

                                <li>
                                    <Link className="text-gray-100 transition hover:text-gray-100/75" href="/">
                                        Lokasi
                                    </Link>
                                </li>

                                <li>
                                    <Link className="text-gray-100 transition hover:text-gray-100/75" href="/">
                                        Berita
                                    </Link>
                                </li>

                                <li>
                                    <Link className="text-gray-100 transition hover:text-gray-100/75" href="/daftar-mentor">
                                        Daftar jadi mentor
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="text-left">
                            <p className="text-lg font-medium text-white">Informasi</p>

                            <ul className="mt-4 md:mt-8 space-y-4 text-sm">
                                <li>
                                    <Link className="text-gray-100 transition hover:text-gray-100/75" href="/">
                                        Pusat Bantuan
                                    </Link>
                                </li>

                                <li>
                                    <Link className="text-gray-100 transition hover:text-gray-100/75" href="/">
                                        Pengembalian Dana
                                    </Link>
                                </li>

                                <li>
                                    <Link className="text-gray-100 transition hover:text-gray-100/75" href="/">
                                        Tanya Jawab
                                    </Link>
                                </li>

                                <li>
                                    <Link className="text-gray-100 transition hover:text-gray-100/75" href="/">
                                        Artikel
                                    </Link>
                                </li>
                            </ul>
                        </div>


                        <div className="text-left col-span-2">
                            <p className="text-lg font-medium text-white">Kontak Kami</p>

                            <ul className="mt-4 md:mt-8 space-y-4 text-sm">
                                <li>
                                    <Link
                                        className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                                        href="/"
                                    >
                                        <RiMessage2Line fontSize={18} className="text-gray-100" />

                                        <span className="flex-1 text-gray-100">info@peluangkita.com</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                                        href="/"
                                    >
                                        <RiPhoneLine fontSize={18} className="text-gray-100" />

                                        <span className="flex-1 text-gray-100">0878-8676-0377</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                                        href="/"
                                    >
                                        <RiInstagramFill fontSize={18} className="text-gray-100" />

                                        <span className="flex-1 text-gray-100">@peluangkita</span>
                                    </Link>
                                </li>

                                <li className="flex items-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end">
                                    <RiMapPinLine fontSize={18} className="text-gray-100"/>

                                    <address className="-mt-0.5 flex-1 not-italic text-gray-100">
                                        Jl. Kemang Timur Raya No.12A, Kec. Ps.Minggu, Kel. Pejaten Barat, 
                                        Jakarta Selatan 12730
                                    </address>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-300 pt-6">
                    <div className="text-center ">
                        {/* <div className="text-sm text-gray-500 flex items-center gap-3">
                            <Link className="inline-block text-white transition hover:text-white/75" href="/">
                                Terms & Conditions
                            </Link>
                            <Link className="inline-block text-white transition hover:text-white/75" href="/">
                                Privacy Policy
                            </Link>
                        </div> */}

                        <p className="mt-4 text-sm text-gray-200 sm:order-first sm:mt-0">&copy; 2023 PeluangKita.com</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

