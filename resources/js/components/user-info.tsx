import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import type { User } from '@/types';
import { Badge } from './ui/badge';

export function UserInfo({
    user,
    unreadNotificationCount,
}: {
    user: User;
    unreadNotificationCount: number;
}) {
    const getInitials = useInitials();

    return (
        <div>
            <Avatar className="relative h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(user.name)}
                </AvatarFallback>
            </Avatar>
            {unreadNotificationCount > 0 && (
                <Badge className="absolute -top-3 -right-3 size-6 rounded-full">
                    {unreadNotificationCount}
                </Badge>
            )}
        </div>
    );
}
