import {SetterOrUpdater, useSetRecoilState} from 'recoil';
import {authenticatedStateAtom} from "./atoms";
import {AuthClient} from "@dfinity/auth-client";
export { useAuthActions };

const days = BigInt(1);
const hours = BigInt(24);
const nanoseconds = BigInt(3600000000000);
function useAuthActions () {
    const setAuth = useSetRecoilState(authenticatedStateAtom);
    return {
        login
    }

    function login() {
        return new Promise(async function(resolve, reject) {
            const authClient = await AuthClient.create();
            await authClient.login({
                onSuccess: async () => {
                    setAuth(true);
                    resolve(authClient);
                },
                onError: async () => {
                    setAuth(false);
                    reject();
                },
                identityProvider:
                    process.env.DFX_NETWORK === "ic"
                        ? "https://identity.ic0.app/#authorize"
                        : "http://localhost:8000/?canisterId=ryjl3-tyaaa-aaaaa-aaaba-cai",
                // Maximum authorization expiration is 8 days
                maxTimeToLive: days * hours * nanoseconds,
            });
        });
    }
}