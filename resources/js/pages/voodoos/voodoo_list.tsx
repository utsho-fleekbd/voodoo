import { useEchoPublic } from '@laravel/echo-react';
import { useState } from 'react';
import type { VoodooWithAuthor } from '@/types';
import type { VoodooCreated } from '@/types/events';
import VoodooCard from './voodoo_card';

export default function VoodooList({
    voodoos,
}: {
    voodoos: VoodooWithAuthor[];
}) {
    const [latestVoodoos, setLatestVoodoos] = useState(voodoos);

    useEchoPublic<VoodooCreated>(
        'voodoos.created',
        'VoodooCreated',
        (event) => {
            setLatestVoodoos(event.latestVoodoos);
        },
    );

    return (
        <ul className="flex min-h-screen flex-1 flex-col gap-2.5 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-[13px] leading-5 shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
            {latestVoodoos.map((voodoo) => (
                <li key={voodoo.id}>
                    <VoodooCard voodoo={voodoo} />
                </li>
            ))}
        </ul>
    );
}
