import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "./db";

export const initialProfile = async () => {
  const user = await currentUser();

  // Redirect to sign-in page if no user is logged in
  if (!user) {
    redirect("/sign-in");
    return null;
  }

  // Check if the profile already exists
  let profile = await db.profile.findUnique({
    where: {
      userId: user.id, // Query by unique field
    },
  });

  // If profile does not exist, create a new one
  if (!profile) {
    profile = await db.profile.create({
      data: {
        userId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl || "",
        email: user.emailAddresses[0]?.emailAddress || "",
      },
    });
  }

  return profile;
};
