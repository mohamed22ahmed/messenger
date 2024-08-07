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


$(document).ready(function(){
    $('#select_file').change(function(){
        imagePreview(this, '.profile-image-preview')
    })

    $('.search_input').on('keyup', function(){
        let query = $(this).val();
        if(query.length >=2)
            searchUsers(query)
    })
});
