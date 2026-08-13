import type { User } from './auth';

export type Voodoo = {
    id: number;
    voodoo: string;
    views_count: number;
    persuasions_count: number;
    re_voodoos_count: number;
    created_at: string;
    updated_at: string;
    author_id: string;
    attachment?: string;
};

export type VoodooWithAuthor = Voodoo & {
    author: User;
};

export type VoodooWithAuthorPersuasionsAndChildren = Voodoo & {
    author: User;
    persuasions: { author: User }[];
    all_children: VoodooWithAuthorPersuasionsAndChildren[];
};
