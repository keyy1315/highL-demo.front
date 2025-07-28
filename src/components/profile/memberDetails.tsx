"use client";
import { useParams } from "next/navigation";

export default function MemberDetails() {
  const params = useParams();
  const userId = params.userId as string;

  console.log(userId);

  return (
    <div>
      <h1>Member Details</h1>
    </div>
  );
}
