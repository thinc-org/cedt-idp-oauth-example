// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios, { AxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { SERVER_OAUTH_CLIENT_ID, SERVER_OAUTH_CLIENT_SERECT, SERVER_OAUTH_DOMAIN_URL, SERVER_OAUTH_REDIRECT_URL } from '../../config/env.server'

type Data = {
  body: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const code = req.body.code

  try {

    const _res = await axios.post(`${SERVER_OAUTH_DOMAIN_URL}/api/oauth/token`, {
      client_id: SERVER_OAUTH_CLIENT_ID,
      client_secret: SERVER_OAUTH_CLIENT_SERECT,
      scope: "profile student_contact_info student_academic_badge student_activity_badge",
      code,
      redirect_uri: SERVER_OAUTH_REDIRECT_URL,
      grant_type: "authorization_code"
    })
    
    res.send({ body: _res.data.access_token });
  } catch(err) {
    const _err = err as AxiosError<{ message: string }>
    res.status(500).send({ body: _err.response?.data.message ?? '' });
  }
}
