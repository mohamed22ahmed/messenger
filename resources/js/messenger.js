function imagePreview(input, selector){
    if(input.files && input.files[0]){
        var render = new FileReader();

        render.onload = function (e){
            $(selector).attr('src', e.target.result)
        }

        render.readAsDataURL(input.files[0])
    }
}

function searchUsers(query){
    $.ajax({
        method:'GET',
        url: '/messenger/search',
        data: {query: query},
        success: function(data){
            $('.wsus__user_list_area_height').html(data.html);
        },
        error: function(xhr, status, error){

        }
    })
}

function userPorfile(formData){
    e.preventDefault();
    let formData = new FormData(this);
    let saveBtn = $('.profile-save-btn');
    saveBtn.text('Updating...').prop('disabled', true);

    $.ajax({
        method: 'POST',
        url: '/profile',
        data: formData,
        processData: false,
        contentType: false,

        success: function (data){
            data = JSON.parse(data);
            notyf.success(data.message)
            window.location.reload();
            saveBtn.text('Save changes').prop('disabled', false);
        },
        error: function(xhr, status, error){
            let errors = xhr.responseJSON.errors
            $.each(errors, function (index, value){
                notyf.error(value[0]);
            })
            saveBtn.text('Save changes').prop('disabled', false);
        }
    })
}

$(document).ready(function(){
    $('#select_file').change(function(){
        imagePreview(this, '.profile-image-preview')
    })

    $('.profile-form').on('submit', function(e){
        userPorfile(this);
    });

    $('.search_input').on('keyup', function(){
        let query = $(this).val();
        if(query.length >=2)
            searchUsers(query)
    })
});
