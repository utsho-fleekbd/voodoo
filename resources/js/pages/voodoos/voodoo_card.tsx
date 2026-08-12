import { Form, Link } from '@inertiajs/react';
import { Eye, MessageCircleMore, WandSparkles } from 'lucide-react';
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

export default function VoodooCard({
    voodoo,
}: {
    voodoo: VoodooWithAuthorAndPersuasionCount;
}) {
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
                                <WandSparkles /> {voodoo.persuasions_count}
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
                                <Eye /> {voodoo.views}
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
