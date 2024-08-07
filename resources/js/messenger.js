function imagePreview(input, selector){
    if(input.files && input.files[0]){
        var render = new FileReader();

        render.onload = function (e){
            $(selector).attr('src', e.target.result)
        }

        render.readAsDataURL(input.files[0])
    }
}

let searchPage = 1;
let noMoreDataSearch = false;
let searchTempVal = "";
function searchUsers(query){
    if(searchTempVal != query){
        searchPage = 1; 
        noMoreDataSearch = false;
    }
    searchTempVal = query;

    if(!noMoreDataSearch){
        $.ajax({
            method:'GET',
            url: '/messenger/search',
            data: {query: query, page:searchPage},
            success: function(data){
                if(searchPage <2){
                    $('.wsus__user_list_area_height').html(data.html);
                }else{
                    $('.wsus__user_list_area_height').append(data.html);
                }

                noMoreDataSearch = searchPage >= data.last_page
                if(!noMoreDataSearch)searchPage++;
            }
        })
    }
}

function actionOnScroll(selector, callback, topScroll = false){
    $(selector).on('scroll', function(){
        let element = $(this).get(0)
        const condition = topScroll ? element.scrollTop == 0 : (element.scrollTop + element.clientHeight) >= element.scrollHeight;

        if(condition) callback();
    })
}

function userPorfile(value){
    e.preventDefault();
    let formData = new FormData(value);
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

    actionOnScroll('.user_search_list_result', function (){
        let value = $('.search_input').val();
        searchUsers(value);
    })
});
