<?php

namespace App\Notifications;

use App\Models\Persuasion;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class VoodooPersuadedOneNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public Persuasion $persuasion) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', 'broadcast'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'voodoo-persuaded-one',

            'actor' => [
                'id' => $this->persuasion->user->id,
                'name' => $this->persuasion->user->name,
            ],

            'voodoo_id' => $this->persuasion->voodoo_id,

            'message' => "{$this->persuasion->user->name} got persuaded by your voodoo.",

            'url' => route('voodoos.show', $this->persuasion->voodoo_id),
        ];
    }

    public function broadcastType(): string
    {
        return 'voodoo-persuaded-one';
    }
}
