import {atom} from "recoil";

const localStorageEffect = key => ({setSelf, onSet}) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
        isReset
            ? localStorage.removeItem(key)
            : localStorage.setItem(key, JSON.stringify(newValue));
    });
};

export const authenticatedStateAtom = atom({
    key: 'authenticated',
    default: false,
    effects: [
        localStorageEffect("authenticated")
    ]
});

export const hasInternetIdentityAtom = atom({
    key: "hasInternetIdentity",
    default: false,
    effects: [
        localStorageEffect("hasInternetIdentity")
    ]
});