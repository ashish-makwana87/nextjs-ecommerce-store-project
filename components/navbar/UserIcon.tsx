import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

async function UserIcon() {
  const user = await currentUser();
  const profileImage = user?.imageUrl;

  if (profileImage) {
    return (
      <img src={profileImage} className='h-6 w-6 rounded-full object-cover' />
    );
  }

  return (
    <div>
      <FaUserCircle className='h-6 w-6 bg-primary rounded-full text-white' />
    </div>
  );
}

export default UserIcon;
