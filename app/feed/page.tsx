"use client"
import { useSession, signIn } from 'next-auth/react';

export default function FeedPage() {
  const { data: session } = useSession();

  return (
    <div className="p-4"> </div>
  );
}
