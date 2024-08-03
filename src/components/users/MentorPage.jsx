import TitleCard from "../ui/TitleCard";
import moment from "moment";
import { fetchUsersByRole } from "@/lib/actions/users";

export default async function MentorPage() {
    const users = await fetchUsersByRole("MENTOR")

    return (
        <TitleCard title={"Data Student"} topMargin="mt-2" >
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead >
                    <tr className="font-bold text-primary text-[14px]">
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Join Date</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {   
                            users.map(user =>{
                                return (
                                    <tr key={user.id} className="text-grey ">
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{moment(user.createdAt).format('DD-MMM-YYYY')}</td>
                                    <td className="flex items-center">
                                        <span className="badge badge-success px-4 text-white font-normal"></span>
                                    </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </TitleCard>
    );
}
