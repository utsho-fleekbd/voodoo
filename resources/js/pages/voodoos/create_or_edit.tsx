import { Form, Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { store, index } from '@/routes/voodoos';
import type { Voodoo } from '@/types';

export default function create_or_edit({ voodoo }: { voodoo?: Voodoo }) {
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
                        <Link
                            href={index()}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Go to Voodoos
                        </Link>
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-83.75 flex-col-reverse lg:max-w-4xl lg:flex-row">
                        <Form
                            className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-[13px] leading-5 shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]"
                            action={store()}
                            method="post"
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>Yap the Voodoo</CardTitle>
                                    <CardDescription>
                                        Cast your voodoo upon the world
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="space-y-1">
                                        <Label htmlFor="voodoo">Voodoo</Label>
                                        <Input
                                            name="voodoo"
                                            value={voodoo?.voodoo}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="voodoo">
                                            Attachment
                                        </Label>
                                        <Input
                                            name="voodoo"
                                            value={voodoo?.attachment}
                                            type="image"
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button>Cast Voodoo</Button>
                                </CardFooter>
                            </Card>
                        </Form>
                    </main>
                </div>
            </div>
        </>
    );
}
