import { getSession } from "next-auth/react";
import { getArtist } from "../../lib/spotify";
import Layout from './../../components/Layout';

export default function Album({ data }) {
  console.log(data);
  return <Layout>{data.name}</Layout>;
}

export async function getServerSideProps(ctx) {
  const {
    token: { accessToken },
  } = await getSession(ctx);

  const response = await getArtist(accessToken, ctx.params.id);
  const data = await response.json();

  return {
    props: {
      data
    },
  }
}