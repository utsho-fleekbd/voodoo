import { Head } from '@inertiajs/react';
import { index } from '@/routes/voodoos';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Voodoos',
            href: index(),
        },
    ],
};
