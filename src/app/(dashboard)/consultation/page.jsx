import ConsultationList from "@/components/konsultasi/ConsultationList";
import Consultation from "@/components/konsultasi/Consultation";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function ConsultationPage() {
  const session = await getServerSession(authOptions);

  if (session?.user.role === "STUDENT") {
    return <Consultation/>
  }

  return (
    <ConsultationList/>
  )
}
