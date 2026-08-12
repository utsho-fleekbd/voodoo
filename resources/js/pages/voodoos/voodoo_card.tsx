import { Form, Link } from '@inertiajs/react';
import { useEchoPublic } from '@laravel/echo-react';
import { Eye, MessageCircleMore, WandSparkles } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
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
import type { VoodooWithAuthorAndPersuasionCount } from '@/types';
import type { ViewCountUpdated, PersuasionCountUpdated } from '@/types/events';

export default function VoodooCard({
    voodoo,
}: {
    voodoo: VoodooWithAuthorAndPersuasionCount;
}) {
    const [persuasionCount, setPersuasionCount] = useState(
        voodoo.persuasions_count,
    );
    const [viewsCount, setViewsCount] = useState(voodoo.views);

    useEchoPublic<PersuasionCountUpdated>(
        `voodoos.${voodoo.id}`,
        'PersuasionCountUpdated',
        (event) => {
            setPersuasionCount(event.count);
        },
    );

    useEchoPublic<ViewCountUpdated>(
        `voodoos.${voodoo.id}`,
        'VoodooViewUpdated',
        (event) => {
            setViewsCount(event.count);
        },
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Yapper: {voodoo.author.name}</CardTitle>
                <CardDescription>
                    Yapped on: {new Date(voodoo.created_at).toString()}
                </CardDescription>
            </CardHeader>
            <CardContent>{voodoo.voodoo}</CardContent>
            <CardFooter className="gap-2.5">
                {/* Get Persuaded */}
                <Tooltip>
                    <Form
                        method="post"
                        action={persuade(voodoo.id)}
                        options={{
                            preserveScroll: true,
                            preserveState: true,
                        }}
                    >
                        <TooltipTrigger asChild>
                            <Button className="cursor-pointer">
                                <WandSparkles /> {persuasionCount}
                            </Button>
                        </TooltipTrigger>
                    </Form>
                    <TooltipContent>This Voodoo is Persuasive</TooltipContent>
                </Tooltip>
                {/* Views */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button asChild>
                            <Link href={show(voodoo.id)}>
                                <Eye /> {viewsCount}
                            </Link>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Views</TooltipContent>
                </Tooltip>
                {/* Re-voodoos */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button>
                            <MessageCircleMore /> "N/A"
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Re-voodoos</TooltipContent>
                </Tooltip>
            </CardFooter>
        </Card>
    );
}
