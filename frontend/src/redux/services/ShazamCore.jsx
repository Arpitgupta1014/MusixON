import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/v1",
    prepareHeaders: (headers)=> {
        headers.set("X-RapidAPI-Key","f0bd190c30msh2d72b96ccd7ae38p17a773jsnf684cfeda69e")

        return headers;
    }
    }),
    endpoints: (builder) => ({
      getTopCharts: builder.query({query: ()=> `/charts/world`}),
      getArtistDetails: builder.query({ query: (artistId) => `/artists/details?artist_id=${artistId}` }),
      getSongsByCountry: builder.query({ query: (countryCode)=> `/charts/country?country_code=${countryCode}`}),
      getSongsBySearch : builder.query({ query: (searchTerm) => `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`}),
      getSongDetails : builder.query({ query : (songid) => `/tracks/details?track_id=${songid}`})
    }),
}); 

export const {
    useGetTopChartsQuery,
    useGetArtistDetailsQuery,
    useGetSongsByCountryQuery,
    useGetSongsBySearchQuery,
    useGetSongDetailsQuery
} = shazamCoreApi;
