<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageRequest;
use App\Models\Message;
use App\Traits\FileUploadTrait;
use App\Traits\MessengerTrait;
use Illuminate\Http\Request;
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

        // convert timeAgo function to mutators in model
        $message['timeAgo'] = $this->timeAge($message->created_at);

        $html = view('messenger.components.message-component', ['message' => $message])->render();
        return response()->json(['result' => 'message sent successfully', 'html' => $html]);
    }

    public function fetchMessage(Request $request){
        $id = $request->input('id');
        $messages = Message::where(function ($query) use ($id) {
            $query->where('from_id', Auth::user()->id)
                  ->Where('to_id', $id);
            })->orWhere(function ($query) use ($id) {
                $query->where('to_id', Auth::user()->id)
                    ->orWhere('from_id', $id);
            })
            ->latest()
            ->paginate(10);

        $html = '';
        foreach ($messages->reverse() as $message) {
            $message['timeAgo'] = $this->timeAge($message->created_at);
            $html.= view('messenger.components.message-component', ['message' => $message])->render();
        }

        return response()->json(['html' => $html, 'last_page' => $messages->lastPage()]);
    }
}
