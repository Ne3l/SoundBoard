function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        }
        return state;
    };
}

const addNote = (state, action) => {
    return {
        ...state,
        notes: [...state.notes, action.note]
    };
};

const removeNote = (state, action) => {
    return {
        ...state,
        notes: state.notes.filter(e => e.scale !== action.note.scale || e.sec !== action.note.sec)
    };
};

const changeZoom = (state, action) => {
    return {
        ...state,
        zoom: action.zoom
    };
};

const incTime = (state, action) => {
    return {
        ...state,
        time: state.time + action.time
    };
};

const togglePlay = (state, action) => {
    return {
        ...state,
        play: !state.play
    };
};

const changeVolume = (state, action) => {
    return {
        ...state,
        volume: !state.volume
    };
};

export const reducer = createReducer(
    {
        zoom: 1,
        play: false,
        time: 0.0,
        volume: 100,
        notes: []
    },
    {
        ADD_NOTE: addNote,
        CHANGE_ZOOM: changeZoom,
        TOGGLE_PLAY: togglePlay,
        INCREASE_TIME: incTime,
        REMOVE_NOTE: removeNote
    }
);
