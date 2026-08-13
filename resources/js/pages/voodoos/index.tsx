import { Head } from '@inertiajs/react';
import type { VoodooWithAuthor } from '@/types';
import VoodooCreateOrEditForm from './create_or_edit';
import VoodooList from './voodoo_list';

export default function index({ voodoos }: { voodoos: VoodooWithAuthor[] }) {
    return (
        <>
            <Head title="Voodoos">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-83.75 text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        <VoodooCreateOrEditForm />
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-83.75 flex-col gap-5 lg:max-w-4xl">
                        <h1 className="text-2xl">Latest Voodoos</h1>
                        <VoodooList voodoos={voodoos} />
                    </main>
                </div>
            </div>
        </>
    );
}
