import { Inter } from "next/font/google";
import { CLIENT_OAUTH_REDIRECT_URL } from "@/config/env.client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("access_token")) return;
    axios
      .get("/api/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        setProfile(res.data.body);
      });
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center gap-4 p-24 ${inter.className}`}
    >
      <a href={CLIENT_OAUTH_REDIRECT_URL}>
        <button className="bg-green-800 rounded-lg p-3">
          Login with CEDT Intern Portal
        </button>
      </a>
      <div className="flex gap-4">
        <Link href="/requests">
          <button disabled={!profile} className="bg-blue-500 rounded-lg p-3 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-60">Request to OAuth</button>
        </Link>

        <button
          disabled={!profile}
          onClick={() => {
            localStorage.removeItem("access_token");
            window.location.reload();
          }}
          className="bg-red-500 rounded-lg p-3 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Logout
        </button>
      </div>

      <pre className="text-wrap">
        Your Profile:{" "}
        {profile
          ? JSON.stringify(profile, null, 2)
          : "Unauthorized or not enough scope"}
      </pre>
    </main>
  );
}
