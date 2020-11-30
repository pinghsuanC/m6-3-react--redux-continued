// authen
export const requestAccessToken = () => ({
  type: "REQUEST_ACCESS_TOKEN",
});

export const receiveAccessToken = (token) => ({
  type: "RECEIVE_ACCESS_TOKEN",
  token,
});

export const receiveAccessTokenError = () => ({
  type: "RECEIVE_ACCESS_TOKEN_ERROR",
});

// Artist
export const requestArtist = () => ({
  type: "REQUEST_ARTIST",
});

export const receiveArtist = (info) => ({
  type: "RECEIVE_ARTIST",
  info,
});

export const receiveArtistError = () => ({
  type: "RECEIVE_ARTIST_ERROR",
});
// top tracks
export const receiveTopTracks = (info) => ({
  type: "RECEIVE_TOPTRACKS",
  info,
});
export const receiveTopTracksError = () => ({
  type: "RECEIVE_TOPTRACKS_ERROR",
});

// related artist
export const receiveRelatedArtists = (info) => ({
  type: "RECEIVE_REARTIST",
  info,
});
export const receiveRelatedArtistsError = () => ({
  type: "RECEIVE_REARTIST_ERROR",
});
