<div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body">
                <form action="#" method="post" class="profile-form" enctype="multipart/form-data">
                    @csrf
                    <div class="file profile-file">
                        <img src="{{ asset('assets/images/'.auth()->user()->avatar) }}" alt="Upload" class="img-fluid profile-image-preview">
                        <label for="select_file"><i class="fal fa-camera-alt"></i></label>
                        <input id="select_file" type="file" hidden name="avatar" accept="image/*">
                    </div>
                    <p>Edit information</p>
                    <input type="text" placeholder="Name" value="{{ auth()->user()->name }}" name="name">
                    <input type="text" placeholder="user ID" value="{{ auth()->user()->username }}" name="username">
                    <input type="email" placeholder="Email" value="{{ auth()->user()->email }}" name="email">
                    <p>Change password</p>
                    <div class="row">
                        <div class="col-xl-6">
                            <input type="password" placeholder="Old Password" name="current_password">
                        </div>
                        <div class="col-xl-6">
                            <input type="password" placeholder="New Password" name="password">
                        </div>
                        <div class="col-xl-12">
                            <input type="password" placeholder="Confirm Password" name="password_confirm">
                        </div>
                    </div>

                    <div class="modal-footer p-0 mt-4">
                        <button type="button" class="btn btn-secondary cancel" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary save">Save changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

@push('scripts')
    <script>
        $(document).ready(function(){
            $('.profile-form').on('submit', function(e){
                e.preventDefault();
                let formData = $(this).serialize()

                $.ajax({
                    method: 'POST',
                    url: '{{ route("profile.update") }}',
                    data: formData,
                    success: function (data){

                    },
                    error: function(xhr, status, error){
                        let errors = xhr.responseJSON.errors
                        $.each(errors, function (index, value){
                            notyf.error(value[0]);
                        })
                    }
                })
            })
        })
    </script>
@endpush
