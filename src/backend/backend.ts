import {Query, Update, ic, Init, PreUpgrade, PostUpgrade, Migrate, Principal} from 'azle';
import {StableStorage} from "./types";

const internetIdentitiesValidated: Principal[] = [];

export function init(): Init {
    ic.print('init');
    ic.stableStorage<StableStorage>().internetIdentitiesValidated = [];
}

export function preUpgrade(): PreUpgrade {
    const migratedIdentities: Migrate<Principal[]> = [...internetIdentitiesValidated]
    ic.stableStorage<StableStorage>().internetIdentitiesValidated = migratedIdentities;
}

export function postUpgrade(): PostUpgrade {
    const idents = ic.stableStorage<StableStorage>().internetIdentitiesValidated;
    internetIdentitiesValidated.push(...idents);
}

export function validateIdentity(): Update<void> {
    const called = ic.caller();
    internetIdentitiesValidated.push(called);
}

export function isIdentityValidated(): Query<boolean> {
    const called = ic.caller();
    return internetIdentitiesValidated.includes(called);
}