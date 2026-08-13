import { Form, Head, Link } from '@inertiajs/react';
import { useEchoPublic } from '@laravel/echo-react';
import { Eye, MessageCircleMore, Send, WandSparkles, X } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

import { persuade } from '@/routes/persuasions';
import { index, storeChildren } from '@/routes/voodoos';

import type { VoodooWithAuthorPersuasionsAndChildren } from '@/types';
import type {
    PersuasionCountUpdated,
    VoodooGotChildren,
    VoodooViewCountUpdated,
} from '@/types/events';

export default function Show({
    voodoo,
}: {
    voodoo: VoodooWithAuthorPersuasionsAndChildren;
}) {
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
                <header className="mb-6 w-full max-w-3xl text-sm not-has-[nav]:hidden lg:max-w-5xl">
                    <nav className="flex items-center justify-end gap-4">
                        <Link
                            href={index()}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Go back
                        </Link>
                    </nav>
                </header>

                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-3xl flex-col-reverse lg:max-w-5xl lg:flex-row">
                        <div className="flex-1 space-y-2.5 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-[13px] leading-5 shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                            <VoodooCardWithReply voodoo={voodoo} />
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

function VoodooCardWithReply({
    voodoo,
}: {
    voodoo: VoodooWithAuthorPersuasionsAndChildren;
}) {
    const [uptoDateVoodoo, setUptoDateVoodoo] = useState(voodoo);

    const [replyOpen, setReplyOpen] = useState(false);

    useEchoPublic<PersuasionCountUpdated>(
        `voodoos.${voodoo.id}`,
        'PersuasionCountUpdated',
        (event) => {
            setUptoDateVoodoo((voodoo) => ({
                ...voodoo,
                persuasions_count: event.count,
            }));
        },
    );

    useEchoPublic<VoodooViewCountUpdated>(
        `voodoos.${voodoo.id}`,
        'VoodooViewCountUpdated',
        (event) => {
            setUptoDateVoodoo((voodoo) => ({
                ...voodoo,
                views_count: event.count,
            }));
        },
    );

    useEchoPublic<VoodooGotChildren>(
        `voodoo-got-children.${voodoo.id}`,
        'VoodooGotChildren',
        (event) => {
            setUptoDateVoodoo(event.voodoo);
        },
    );

    return (
        <>
            <Card className="gap-2">
                <CardHeader>
                    <CardTitle>
                        <p className="flex items-center gap-1.5 text-sm font-semibold">
                            {uptoDateVoodoo.author.name}

                            <span className="text-xs font-thin italic">
                                {new Date(
                                    uptoDateVoodoo.created_at,
                                ).toLocaleDateString()}
                            </span>
                        </p>
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <p className="text-xl">{uptoDateVoodoo.voodoo}</p>
                </CardContent>

                <CardFooter className="gap-2.5">
                    {/* Get Persuaded */}
                    <Tooltip>
                        <Form
                            method="post"
                            action={persuade(uptoDateVoodoo.id)}
                            options={{
                                preserveScroll: true,
                                preserveState: true,
                            }}
                        >
                            <TooltipTrigger asChild>
                                <Button
                                    type="submit"
                                    size="sm"
                                    className="cursor-pointer"
                                >
                                    <WandSparkles />
                                    {uptoDateVoodoo.persuasions_count}
                                </Button>
                            </TooltipTrigger>
                        </Form>

                        <TooltipContent>
                            This Voodoo is Persuasive
                        </TooltipContent>
                    </Tooltip>

                    {/* Views */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button size="sm" type="button">
                                <Eye />
                                {uptoDateVoodoo.views_count}
                            </Button>
                        </TooltipTrigger>

                        <TooltipContent>Views</TooltipContent>
                    </Tooltip>

                    {/* Reply */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                type="button"
                                size="sm"
                                variant={replyOpen ? 'secondary' : 'default'}
                                onClick={() => setReplyOpen((open) => !open)}
                            >
                                {replyOpen ? (
                                    <X />
                                ) : (
                                    <>
                                        <MessageCircleMore />
                                        {uptoDateVoodoo.re_voodoos_count}
                                    </>
                                )}
                            </Button>
                        </TooltipTrigger>

                        <TooltipContent>
                            {replyOpen ? 'Close reply' : 'Re-voodoo'}
                        </TooltipContent>
                    </Tooltip>
                </CardFooter>

                <CardContent className="space-y-2.5">
                    {uptoDateVoodoo.all_children.map((voodoo) => (
                        <VoodooCardWithReply key={voodoo.id} voodoo={voodoo} />
                    ))}
                </CardContent>
            </Card>

            {/* Collapsible reply box */}
            {replyOpen && (
                <div className="ml-6 border-l-2 border-border pl-4">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm">
                                Reply to {uptoDateVoodoo.author.name}
                            </CardTitle>
                        </CardHeader>

                        <Form
                            method="post"
                            action={storeChildren()}
                            options={{
                                preserveScroll: true,
                                preserveState: true,
                            }}
                            resetOnSuccess
                            onSuccess={() => setReplyOpen(false)}
                            className="space-y-2.5"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <CardContent className="space-y-2">
                                        <input
                                            hidden
                                            name="parent_voodoo_id"
                                            value={uptoDateVoodoo.id}
                                        />

                                        <Input
                                            name="voodoo"
                                            placeholder="Write your re-voodoo..."
                                            autoFocus
                                            className="min-h-12 resize-none"
                                        />

                                        {errors.voodoo && (
                                            <p className="text-xs text-destructive">
                                                {errors.voodoo}
                                            </p>
                                        )}
                                    </CardContent>

                                    <CardFooter className="justify-end gap-2">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() => setReplyOpen(false)}
                                        >
                                            Cancel
                                        </Button>

                                        <Button
                                            type="submit"
                                            disabled={processing}
                                        >
                                            <Send />
                                            {processing
                                                ? 'Replying...'
                                                : 'Reply'}
                                        </Button>
                                    </CardFooter>
                                </>
                            )}
                        </Form>
                    </Card>
                </div>
            )}
        </>
    );
}
