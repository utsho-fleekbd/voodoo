<?php

namespace App\Notifications;

use App\Models\Voodoo;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class VoodooGotChildrenNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public Voodoo $voodoo) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', 'broadcast'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'voodoo-got-children',

            'actor' => [
                'id' => $this->voodoo->author_id,
                'name' => $this->voodoo->author->name,
            ],

            'voodoo_id' => $this->voodoo->parent_voodoo_id,

            'message' => "{$this->voodoo->author->name} re-voodood on your voodoo.",

            'url' => route('voodoos.show', $this->voodoo->id),
        ];
    }

    public function broadcastType(): string
    {
        return 'voodoo-got-children';
    }
}
