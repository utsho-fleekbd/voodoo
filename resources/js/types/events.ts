import type {
    VoodooWithAuthor,
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
    latestVoodoos: VoodooWithAuthor[];
};

export type VoodooGotChildren = {
    voodoo: VoodooWithAuthorPersuasionsAndChildren;
};
