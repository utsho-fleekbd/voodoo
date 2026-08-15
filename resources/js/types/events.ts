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
    voodoo: VoodooWithAuthor;
};

export type VoodooGotChildren = {
    voodoo: VoodooWithAuthorPersuasionsAndChildren;
};
