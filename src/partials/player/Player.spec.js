import * as actions from './PlayerActions';
import reducer, { defaultState } from './PlayerReducer';

describe('Player', () => {

  const testAudio = new Audio();

  it('should create action to load song', () => {
    expect(actions.loadSong("song", testAudio)).toEqual({
      type: actions.LOAD_SONG,
      song: "song"
    });
  });

  it('should create action to play song', () => {
    expect(actions.playSong(testAudio)).toEqual({
      type: actions.PLAY_SONG
    });
  });

  it('should create action to pause song', () => {
    expect(actions.pauseSong(testAudio)).toEqual({
      type: actions.PAUSE_SONG
    });
  });

  it('should create action to toggle player', () => {
    expect(actions.togglePlayer()).toEqual({
      type: actions.TOGGLE_PLAYER
    });
  });

  it('should set current song with loadSong', () => {
    expect(reducer(undefined, actions.loadSong("song", testAudio))).toEqual({
      ...defaultState,
      currentSong: "song"
    });
  });

  it('should set playing to true with playSong', () => {
    expect(reducer(undefined, actions.playSong(testAudio))).toEqual({
      ...defaultState,
      playing: true
    });
  });

  it('should set playing to false with pauseSong', () => {

    const playingState = {
      ...defaultState,
      playing: true
    }

    expect(reducer(playingState, actions.pauseSong(testAudio))).toEqual({
      ...playingState,
      playing: false
    });

  });

  it('should open player when closed with togglePlayer', () => {
    expect(reducer(undefined, actions.togglePlayer())).toEqual({
      ...defaultState,
      visible: true
    });
  });

  it('should close player when open with togglePlayer', () => {

    const openState = {
      ...defaultState,
      visible: true
    }

    expect(reducer(openState, actions.togglePlayer())).toEqual({
      ...openState,
      visible: false
    });

  });

  it('should return state with unrecognized action', () => {
    expect(reducer(undefined, { type: "unexpected" })).toEqual(
      defaultState
    );
  });

});