import Image from "next/image";
import { getSession } from "next-auth/react";
import Layout from "../../components/Layout";
import { getTrack } from "../../lib/spotify";
import { FaSpotify as Spotify } from 'react-icons/fa'

export default function Track({ data }) {
  return (
    <Layout>
      <div className="flex items-center py-20 px-10">
        <Image alt="Album Cover"
          width={200}
          height={200}
          src={data.album.images[0].url} />
        <div className="ml-10">
          <h2 className="text-4xl font-medium">{data.name}</h2>
          <p className="text-2xl">By {data.artists.map(({ name }, i) => (
            <span key={i}> {name} </span>
          ))} </p>
          <p className="text-xl mb-4">{data.album.name}</p>
          <a href={data.external_urls.spotify} className="flex w-60 justify-center items-center bg-[#1db954] px-2 py-[6px] text-md rounded-full uppercase font-medium"> <span><Spotify className="text-white text-xl mr-2"/></span> Listen on Spotify</a>
        </div>
      </div>
    </Layout>
  );
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