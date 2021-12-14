import {getUsersProfile} from '../../lib/spotify';
import {getSession} from 'next-auth/react';

const handler = async (req, res) => {
  const {
    token: {accessToken},
  } = await getSession({req});
  const response = await getUsersProfile(accessToken);
  const json = await response.json();

  return res.status(200).json(json);
};

export default handler;