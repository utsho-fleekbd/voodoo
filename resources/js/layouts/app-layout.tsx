import { Link, usePage } from '@inertiajs/react';
import { useEchoNotification } from '@laravel/echo-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { BreadcrumbItem, Notification } from '@/types';

export default function AppLayout({
    breadcrumbs = [],
    children,
}: {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}) {
    const { auth } = usePage().props;

    useEchoNotification<Notification>(
        `App.Models.User.${auth.user.id}`,
        (notification) => {
            switch (notification.type) {
                case 'voodoo-persuaded-one':
                case 'voodoo-got-children':
                    toast.success(() => (
                        <p className="text-sm font-normal">
                            {notification.message}{' '}
                            <Button
                                asChild
                                type="button"
                                size="sm"
                                variant="link"
                            >
                                <Link href={notification.url}>
                                    View Details
                                </Link>
                            </Button>
                        </p>
                    ));
                    break;

                default:
                    break;
            }
        },
    );

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs}>
            {children}
        </AppLayoutTemplate>
    );
}
