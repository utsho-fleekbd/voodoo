import { Form, Head, Link } from '@inertiajs/react';
import { CheckCheck, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { markAsRead, markAllAsRead } from '@/routes/notifications';
import type { NotificationWithMeta } from '@/types';

export default function index({
    notifications,
}: {
    notifications: NotificationWithMeta[];
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
                <header className="mb-6 w-full max-w-83.75 text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        <Form
                            method="post"
                            action={markAllAsRead()}
                            options={{
                                preserveScroll: true,
                                preserveState: true,
                            }}
                        >
                            <Button>
                                <CheckCheck /> Mark All as Read
                            </Button>
                        </Form>
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-83.75 flex-col gap-5 lg:max-w-4xl">
                        <h1 className="text-2xl">Latest Voodoos</h1>
                        {notifications.map((notification) => (
                            <Card key={notification.id}>
                                <CardContent className="flex items-center justify-between">
                                    <div className="flex flex-col gap-1">
                                        <p>{notification.data.message}</p>
                                        <p className="text-xs font-thin">
                                            {new Date(
                                                notification.created_at,
                                            ).toLocaleDateString()}
                                            <span className="font-normal">
                                                {' '}
                                                at{' '}
                                            </span>
                                            {new Date(
                                                notification.created_at,
                                            ).toLocaleTimeString()}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    asChild
                                                    className="rounded-full"
                                                    size="sm"
                                                >
                                                    <Link
                                                        href={
                                                            notification.data
                                                                .url
                                                        }
                                                    >
                                                        <Eye />
                                                    </Link>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                View
                                            </TooltipContent>
                                        </Tooltip>
                                        {!notification.read_at && (
                                            <Tooltip>
                                                <Form
                                                    method="post"
                                                    action={markAsRead(
                                                        notification.id,
                                                    )}
                                                    options={{
                                                        preserveScroll: true,
                                                        preserveState: true,
                                                    }}
                                                >
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            className="rounded-full"
                                                            size="sm"
                                                        >
                                                            <CheckCheck />
                                                        </Button>
                                                    </TooltipTrigger>
                                                </Form>
                                                <TooltipContent>
                                                    Mark as Read
                                                </TooltipContent>
                                            </Tooltip>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </main>
                </div>
            </div>
        </>
    );
}
