import NextAuth from "next-auth";
import Spotify from 'next-auth/providers/spotify';

export default NextAuth({
  providers: [
    Spotify({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        authorization: "https://accounts.spotify.com/authorize?scope=user-read-private+user-read-email+user-top-read+playlist-read-private+playlist-modify-private+user-read-recently-played+user-follow-modify+user-follow-read"
      }),
    ],
    callbacks: {
        async jwt({token, account}) {
          if (account) {
            token.accessToken = account.refresh_token;
          }
          return token;
        },
        async session(session, user) {
          session.user = user;
          return session;
        },
      },
});
