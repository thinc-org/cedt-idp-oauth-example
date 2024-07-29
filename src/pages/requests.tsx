import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import axios from "axios";

const AuthCallback = () => {
  const [path, setPath] = useState('');
  const [response, setResponse] = useState<any>(null);

  const sendRequest = () => {
    if (!path) return
    axios
      .get(`/api/${path}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        }
      })
      .then((res) => {
        setResponse(res.data);
      }).catch((err) => {
        setResponse(err.response.data)
      });
  }

  return (
    <div className="p-5 flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <input placeholder="Target endpoint" value={path} className="text-black p-2" onChange={(ev) => setPath(ev.target.value)} />
        <button disabled={!path} onClick={sendRequest} className="p-2 rounded-lg bg-red-600 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-60">Send Request</button>
      </div>
      <pre>Response: {JSON.stringify(response, null, 2)}</pre>
    </div>
  );
};

export default AuthCallback;
