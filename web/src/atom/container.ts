import { atom } from "recoil";

export const containerState = atom({
    key: "containerState",
    default: {
        containerId: "",
        internalPort: 0,
        externalPort: 0,
    },
});

export const imageAtom = atom<string>({
    key: 'image',
    default: ''
})