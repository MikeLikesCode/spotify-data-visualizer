import { getSession } from "next-auth/react";
import { getTrack } from "../../lib/spotify";

export default function Track({ data }) {
  console.log(data);
  return <div>{data.name}</div>;
}

export async function getServerSideProps(ctx) {
  const {
    token: { accessToken },
  } = await getSession(ctx);
  
  const response = await getTrack(accessToken, ctx.params.id);
  const data = await response.json();

  return {
    props: {
      data
    },
  }
}