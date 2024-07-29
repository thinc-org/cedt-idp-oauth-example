import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import axios from "axios";

const AuthCallback = () => {
  const { query } = useRouter();

  const router = useRouter()

  useEffect(() => {
    if (query.code) {
      axios
        .post("/api/login", {
          code: query.code,
        })
        .then((res) => {
          router.replace('/')
          localStorage.setItem("access_token", res.data.body);
        });
    }
  }, [query.code, router]);

  return (
    <>
      {query.code}
    </>
  );
};

export default AuthCallback;
