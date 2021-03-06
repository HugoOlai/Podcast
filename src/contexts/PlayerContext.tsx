import next from 'next';
import { createContext, ReactNode, useContext } from 'react';
import { useState } from 'react'

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}


type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    setPlayingState: (state: boolean) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    ClearPlayerState: () => void;
    hasPrevious: boolean;
    hasNext: boolean;

}
export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
    children: ReactNode;
}
export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([])
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);


    function play(episode: Episode) {
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true)
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list);
        setCurrentEpisodeIndex(index)
        setIsPlaying(true)
    }

    function togglePlay() {
        setIsPlaying(!isPlaying);
    }

    function toggleLoop() {
        setIsLooping(!isLooping);
    }

    function toggleShuffle() {
        setIsShuffling(!isShuffling);
    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state);
    }

    function ClearPlayerState() {
        setEpisodeList([]);
        setCurrentEpisodeIndex(0);
    }

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length;

    function playNext() {

        if (isShuffling) {
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)

            setCurrentEpisodeIndex(nextRandomEpisodeIndex)
        } else if (hasNext) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);

        }
    }

    function playPrevious() {
        if (hasPrevious) {
            setCurrentEpisodeIndex(currentEpisodeIndex - 1);

        }
    }

    return (
        <PlayerContext.Provider value={{
            episodeList,
            currentEpisodeIndex,
            play,
            isPlaying,
            playNext,
            playPrevious,
            playList,
            togglePlay,
            hasPrevious,
            hasNext,
            setPlayingState,
            isLooping,
            toggleLoop,
            toggleShuffle,
            isShuffling,
            ClearPlayerState,
        }}>

            {children}
        </PlayerContext.Provider>
    )

}

export const usePlayer = () => {
    return useContext(PlayerContext)
}