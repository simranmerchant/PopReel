"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OnboardingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const interests = ["Fashion", "Technology", "Food", "Sports", "Music", "Travel"];

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleCompleteOnboarding = async () => {
    if (!username || !password || !profileImage || selectedInterests.length === 0) {
      alert("Please fill in all fields and select at least one interest");
      return;
    }

    setLoading(true);
    try {
      // Create FormData to handle file upload
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('profileImage', profileImage);
      formData.append('interests', JSON.stringify(selectedInterests));

      const response = await fetch('/api/complete-onboarding', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to complete onboarding');
      }

      router.push('/feed');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      alert('Failed to complete onboarding. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <div className="bg-zinc-900 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Complete Your Profile</h1>
        
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 bg-zinc-800 text-white rounded-lg border border-zinc-700 focus:border-[#FE2C55] focus:outline-none"
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-zinc-800 text-white rounded-lg border border-zinc-700 focus:border-[#FE2C55] focus:outline-none"
          />

          <div className="w-full p-3 bg-zinc-800 text-white rounded-lg border border-zinc-700">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-zinc-400"
            />
          </div>

          <div className="mt-6">
            <p className="text-white mb-3">Select your interests:</p>
            <div className="grid grid-cols-2 gap-2">
              {interests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`p-2 rounded-lg transition-colors ${
                    selectedInterests.includes(interest)
                      ? 'bg-[#FE2C55] text-white'
                      : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleCompleteOnboarding}
            disabled={loading}
            className="w-full mt-6 px-6 py-3 text-white bg-[#FE2C55] rounded-full hover:bg-[#FF004F] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Complete Profile'}
          </button>
        </div>
      </div>
    </div>
  );
}