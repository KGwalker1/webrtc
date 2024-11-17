import InitialModal from "@/components/modals/initial-model";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/intital-profile";
import { redirect } from "next/navigation";

const SetupPage = async () => {
  const profile = await initialProfile();

  if (!profile) {
    // Redirect to login or a setup page
    redirect("/login"); // Adjust to your app's flow
    return null;
  }

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (server) {
    redirect(`/servers/${server.id}`);
  }

  return <InitialModal />;
};

export default SetupPage;
