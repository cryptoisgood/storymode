import { useSetRecoilState } from 'recoil';
import {hasInternetIdentityAtom} from "./atoms";
import {AuthClient} from "@dfinity/auth-client";
import {Actor, HttpAgent} from "@dfinity/agent";
import {canisterId, idlFactory} from "../../../declarations/backend";
import {_SERVICE} from "../../../declarations/backend/backend.did";
export { backendStateActions };

function backendStateActions () {
    const setHasInternetIdentity = useSetRecoilState(hasInternetIdentityAtom);

    return {
        isIdentityAuthenticated
    }

    function isIdentityAuthenticated() {
        return new Promise(async function(resolve) {
            const authClient = await AuthClient.create();
            const isAuthenticated = await authClient.isAuthenticated();
            let authenticated = false;
            if (isAuthenticated) {
                const agentOptions = {
                    host: "http://localhost:8000",
                    identity: await authClient.getIdentity(),
                };
                const agent = new HttpAgent(agentOptions);

                // Fetch root key for certificate validation during development
                if(process.env.NODE_ENV !== "production") {
                    agent.fetchRootKey().catch(err=>{
                        console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
                        console.error(err);
                    });
                }

                // Creates an actor with using the candid interface and the HttpAgent
                const actor: _SERVICE = await Actor.createActor(idlFactory, {
                    agent,
                    canisterId
                });

                const isIdentityValidated = await actor.isIdentityValidated();
                if (!isIdentityValidated) {
                    await actor.validateIdentity();
                    authenticated = true;
                } else {
                    authenticated = true;
                }
            }
            setHasInternetIdentity(authenticated);
            resolve(authenticated);
        });
    }
}