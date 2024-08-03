import ConsultationList from "@/components/konsultasi/ConsultationList";
import Consultation from "@/components/konsultasi/Consultation";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ConsultationPage() {
  const session = await getServerSession(authOptions);

  if (session?.user.role === "STUDENT") {
    // redirect(`/consultation/${session.user.id}`)
    return <Consultation/>
  }

  return (
    <ConsultationList/>
  )
}
