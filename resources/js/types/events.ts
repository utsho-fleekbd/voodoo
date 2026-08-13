import type {
    VoodooWithAuthorAndPersuasionCount,
    VoodooWithAuthorPersuasionsAndChildren,
} from './voodoo';

export type PersuasionCountUpdated = {
    voodooId: number;
    count: number;
};

export type VoodooViewCountUpdated = {
    voodooId: number;
    count: number;
};

export type VoodooCreated = {
    latestVoodoos: VoodooWithAuthorAndPersuasionCount[];
};

export type VoodooGotChildren = {
    voodoo: VoodooWithAuthorPersuasionsAndChildren;
};
