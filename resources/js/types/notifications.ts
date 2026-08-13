export type NotificationWithMeta = {
    id: string;
    read_at: string | null;
    created_at: string;
    data: Notification;
};

export type Notification = VoodooNotification;

export type VoodooNotification =
    VoodooPersuadedOneNotification | VoodooGotChildrenNotification;

export type VoodooGotChildrenNotification = {
    type: 'voodoo-got-children';

    actor: {
        id: number;
        name: string;
    };

    voodoo_id: number;

    message: string;

    url: string;
};

export type VoodooPersuadedOneNotification = {
    type: 'voodoo-persuaded-one';

    actor: {
        id: number;
        name: string;
    };

    voodoo_id: number;

    message: string;

    url: string;
};
