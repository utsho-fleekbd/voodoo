import type { User } from './auth';

export type Voodoo = {
    id: number;
    voodoo: string;
    views: number;
    created_at: string;
    updated_at: string;
    author_id: string;
    attachment?: string;
};

export type VoodooWithAuthorAndPersuasionCount = Voodoo & {
    author: User;
    persuasions_count: number;
};
