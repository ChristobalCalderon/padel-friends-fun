import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'

// Serverless function
// Protected API, requests to '/api/protected' without a valid session cookie will fail

async function handle(req:NextApiRequest, res:NextApiResponse) {
  const { user }:any = getSession(req, res)

  try {
    res.status(200).json({
      session: 'true',
      id: user.sub,
      nickname: user.nickname,
    })
  } catch (e) {
    res.status(500).json({ error: 'Unable to fetch', description: e })
  }
}

export default withApiAuthRequired(handle)
