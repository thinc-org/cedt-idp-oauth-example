// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios, { AxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from 'cookies-next';
import { SERVER_OAUTH_DOMAIN_URL } from "@/config/env.server";

type Data = {
  body: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {  
  const pathArray = req.query.path as string[]
  const path = pathArray.join('/')
  try {
    const _res = await axios.get(`${SERVER_OAUTH_DOMAIN_URL}/api/${path}`, {
      headers: {
        Authorization: req.headers.authorization,
      }
    }) 
    res.send({ body: _res.data });
  } catch(err) {
    const _err = err as AxiosError<{ message: string }>
    res.status(500).send({ body: _err.response?.data.message });
  }
}
