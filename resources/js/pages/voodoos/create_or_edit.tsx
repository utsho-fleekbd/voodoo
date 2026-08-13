import { Form } from '@inertiajs/react';
import { WandSparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { store } from '@/routes/voodoos';
import type { Voodoo } from '@/types';

export default function VoodooCreateOrEditForm({
    voodoo,
}: {
    voodoo?: Voodoo;
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    Cast a Voodoo <WandSparkles />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <Form
                    className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-[13px] leading-5 shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]"
                    action={store()}
                    method="post"
                    options={{
                        preserveScroll: true,
                        preserveState: true,
                    }}
                >
                    {({ errors, processing }) => (
                        <>
                            <DialogHeader>
                                <DialogTitle>Yap the Voodoo</DialogTitle>
                                <DialogDescription>
                                    Cast your voodoo upon the world
                                </DialogDescription>
                            </DialogHeader>
                            <div className="my-1">
                                <Input
                                    name="voodoo"
                                    placeholder="Write your Voodoo..."
                                    autoFocus
                                    className="min-h-12 resize-none"
                                    defaultValue={voodoo?.voodoo}
                                />

                                {errors.voodoo && (
                                    <p className="text-xs text-destructive">
                                        {errors.voodoo}
                                    </p>
                                )}
                            </div>
                            <DialogFooter className="mt-2.5 flex w-full justify-end">
                                <Button disabled={processing}>
                                    {processing
                                        ? 'Casting Voodoo...'
                                        : 'Cast Voodoo'}
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
