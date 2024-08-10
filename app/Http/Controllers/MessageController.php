<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageRequest;
use App\Models\Message;
use App\Traits\FileUploadTrait;
use App\Traits\MessengerTrait;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    use FileUploadTrait, MessengerTrait;

    public function sendMessage(MessageRequest $request){
        $attachment = $this->uploadFile($request, 'attachment', '/attachments');
        $message = Message::create([
            'from_id' => Auth::user()->id,
            'to_id' => $request->reciever,
            'body' => $request->message,
            'attachment_link' => $attachment
        ]);

        $sentTime = $this->timeAge($message->created_at);

        return response()->json(['result' => 'message sent successfully', 'message' => $request->message, 'sent' => $sentTime, 'attachment' => $attachment]);
    }
}
