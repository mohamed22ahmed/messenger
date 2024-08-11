<div class="wsus__single_chat_area">
    <div class="wsus__single_chat {{ Auth::user()->id == $message->from_id ? 'chat_right' : '' }}">
        @if ($message->attachment_link)
        <a class="venobox" data-gall="gallery01" href="{{ $message->attachment_link }}">
            <img src="{{ asset($message->attachment_link) }}" alt="gallery1" class="img-fluid w-100">
        </a>
        @endif

        @if ($message->body)
        <p class="messages" style="{{ Auth::user()->id == $message->from_id ? 'background:blue' : 'background:gray' }}">{{ $message->body }}</p>
        @endif

        <p class="time"> {{ $message->timeAgo }}</p>
        <a class="action" href="#"><i class="fas fa-trash"></i></a>
    </div>
</div>
