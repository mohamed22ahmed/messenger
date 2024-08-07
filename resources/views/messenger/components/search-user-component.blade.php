<div class="wsus__user_list_item">
    <div class="img">
        <img src="{{ asset($user->avatar) }}" alt="User" class="img-fluid">
        {{-- <span class="active"></span> --}}
    </div>
    <div class="text">
        <h5>{{ $user->name }}</h5>
        <p>{{ $user->username }}</p>
    </div>
    {{-- <span class="time">10m ago</span> --}}
</div>
