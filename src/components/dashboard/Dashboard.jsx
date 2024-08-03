'use client'
import { IoChatboxEllipses } from 'react-icons/io5';
import { MdPayments } from 'react-icons/md';
import { BiSolidBookAlt } from 'react-icons/bi';
import LineChart from './ui/LineChart';
import DoughnutChart from './ui/DoughnutChart';
import Stats from '../ui/StatsCard';

const statsData = [
    {title : "Total Learning", value : "23", icon: <BiSolidBookAlt size={30}/>, color:"bg-white"},
    {title : "Total Consultation", value : "16" , icon: <IoChatboxEllipses size={30}/>, color:"bg-white"},
    {title : "Total Transaction", value : "5", icon: <MdPayments size={30}/>, color:"bg-white"},
    {title : "Total Users", value : "20301", icon: <MdPayments size={30}/>, color:"bg-white"},
]

function dashboard() {
    return (
        <>
         <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-3 grid-cols-1 gap-6 ">
            {
                statsData.map((d, k) => {
                    return (
                        <Stats key={k} {...d} />
                    )
                })
            }
        </div>

        <div className="grid lg:grid-cols-3  grid-cols-1 gap-6">
            <div className="col-span-2">
                <LineChart />
            </div>
            <DoughnutChart/>
        </div>
        </>
       
    );
}

export default dashboard;