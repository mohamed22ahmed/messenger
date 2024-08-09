<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageRequest;
use App\Models\Message;
use App\Traits\FileUploadTrait;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    use FileUploadTrait;

    public function sendMessage(MessageRequest $request){
        $attachment = $this->uploadFile($request, 'attachment');
        Message::create([
            'from_id' => Auth::user()->id,
            'to_id' => $request->reciever,
            'body' => $request->message,
            'attachment_link' => $attachment
        ]);

        return response()->json(['result' => 'message sent successfully', 'message' => $request->message]);
    }
}
