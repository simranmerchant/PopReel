"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/feed");
        }
    }, [status, router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="p-8 bg-zinc-900 rounded-2xl shadow-xl w-96">
                <h1 className="mb-6 text-3xl font-bold text-white text-center">
                    PopReel
                </h1>
                <p className="text-zinc-400 text-center mb-8">
                    Create, share, and discover amazing content
                </p>
                <div className="space-y-4">
                    <button
                        onClick={() => signIn("google", { callbackUrl: "/api/auth/signin" })}
                        className="w-full px-6 py-3 text-white bg-[#FE2C55] rounded-full hover:bg-[#FF004F] transition-colors duration-300 font-medium text-lg flex items-center justify-center gap-2"
                    >
                        <img src="./images/google-logo.png" alt="Google" className="w-5 h-5" />
                        Login with Google
                    </button>
                    <button
                        onClick={() => signIn("google", { callbackUrl: "/api/auth/signup" })}
                        className="w-full px-6 py-3 text-white bg-transparent border-2 border-[#FE2C55] rounded-full hover:bg-[#FE2C55]/10 transition-colors duration-300 font-medium text-lg flex items-center justify-center gap-2"
                    >
                        <img src="./images/google-logo.png" alt="Google" className="w-5 h-5" />
                        Sign Up with Google
                    </button>
                </div>
                <p className="text-zinc-500 text-sm text-center mt-6">
                    By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    );
}