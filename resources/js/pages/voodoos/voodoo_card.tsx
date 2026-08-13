import { Form, Link } from '@inertiajs/react';
import { useEchoPublic } from '@laravel/echo-react';
import { Eye, MessageCircleMore, WandSparkles } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from '@/components/ui/tooltip';
import { persuade } from '@/routes/persuasions';
import { show } from '@/routes/voodoos';
import type { VoodooWithAuthor } from '@/types';
import type {
    VoodooViewCountUpdated,
    PersuasionCountUpdated,
} from '@/types/events';

export default function VoodooCard({ voodoo }: { voodoo: VoodooWithAuthor }) {
    const [uptoDateVoodoo, setUptoDateVoodoo] = useState(voodoo);

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

    return (
        <Card>
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
            <CardContent className="space-y-2">
                <p className="text-xl">{uptoDateVoodoo.voodoo}</p>
                <p className="text-xs font-thin">
                    {new Date(uptoDateVoodoo.created_at).toLocaleDateString()}
                    <span className="font-normal"> at </span>
                    {new Date(uptoDateVoodoo.created_at).toLocaleTimeString()}
                </p>
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
                            <Button className="cursor-pointer">
                                <WandSparkles />{' '}
                                {uptoDateVoodoo.persuasions_count}
                            </Button>
                        </TooltipTrigger>
                    </Form>
                    <TooltipContent>This Voodoo is Persuasive</TooltipContent>
                </Tooltip>
                {/* Views */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button asChild>
                            <Link href={show(uptoDateVoodoo.id)}>
                                <Eye /> {uptoDateVoodoo.views_count}
                            </Link>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Views</TooltipContent>
                </Tooltip>
                {/* Re-voodoos */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button>
                            <MessageCircleMore />{' '}
                            {uptoDateVoodoo.re_voodoos_count}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Re-voodoos</TooltipContent>
                </Tooltip>
            </CardFooter>
        </Card>
    );
}
