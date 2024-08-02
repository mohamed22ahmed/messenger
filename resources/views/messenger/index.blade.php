@extends("messenger.layouts.app")

@section("content")
    <section class="wsus__chat_app">
        @include("messenger.layouts.user_list_sidebar")

        @include("messenger.layouts.chat_area")

        @include("messenger.layouts.chat_info")

    </section>
@endsection
