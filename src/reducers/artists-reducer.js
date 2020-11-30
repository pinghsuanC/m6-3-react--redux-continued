const initialState = {
  currentArtist: null,
  status: "idle",
};

export default function artistsReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_ARTIST": {
      return { ...state, status: "loading" };
    }
    case "RECEIVE_ARTIST": {
      console.log();
      return {
        ...state,
        currentArtist: { profile: action.info },
        status: "idle",
      };
    }
    case "RECEIVE_ARTIST_ERROR": {
      return { ...state, status: "error" };
    }
    case "RECEIVE_REARTIST": {
      return {
        ...state,
        currentArtist: { ...state.currentArtist, related: action.info },
        status: "idle",
      };
    }
    case "RECEIVE_REARTIST_ERROR": {
      return { ...state, status: "error" };
    }
    case "RECEIVE_TOPTRACKS": {
      return {
        ...state,
        currentArtist: { ...state.currentArtist, topTracks: action.info },
        status: "idle",
      };
    }
    case "RECEIVE_TOPTRACKS_ERROR": {
      return { ...state, status: "error" };
    }
    default: {
      return state;
    }
  }
}
