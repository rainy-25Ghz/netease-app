import { createContext, Dispatch } from "react";

interface MusicContextInterface {
	name: string;
	setName: Dispatch<string>;
	url: string;
	setUrl: Dispatch<string>;
	artists: string;
	setArtists: Dispatch<string>;
	duration: string;
	setDuration: Dispatch<string>;
	songIds: number[];
	setSongIds: Dispatch<number[]>;
	currI:number;
	setCurrI:Dispatch<number>;
}
export const MusicContext = createContext<MusicContextInterface>({
	name: "",
	setArtists: () => {},
	setName: () => {},
	setDuration: () => {},
	setUrl: () => {},
	url: "",
	artists: "",
	duration: "",
	songIds: [],
	setSongIds: () => {},
	currI:-1,
	setCurrI:()=>{}
});
