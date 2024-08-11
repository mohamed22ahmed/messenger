// code for displaying the formData keys and values
/**for (var pair of formData.entries()) {
    console.log(pair[0]+ ': ' + pair[1]);
}*/
import *  as messages from'./messages.js';

let messengerId = 0;
let searchPage = 1;
let noMoreDataSearch = false;
let searchTempVal = "";

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

function getUserData(userId){
    $.ajax({
        method: 'Get',
        url: '/profile/' + userId,
        success: function (data){
            $('.chat-profile-image').find('img').attr('src', data.avatar)
            $('.chat-profile-name').text(data.name);
            $('.chat-profile-username').text(data.username);
            messengerId = userId;

            $('#blankDiv').remove()
            $('.wsus__chat_app').removeClass('show_info')

            messages.fetchMessages(userId)
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

    $("body").on('click', '.messenger-user-data', function(e){
        const userId = e.currentTarget.getAttribute('data-id')
        getUserData(userId)
    })

    actionOnScroll('.user_search_list_result', function (){
        let value = $('.search_input').val();
        searchUsers(value);
    })

    $('.send-message-form').on('submit', function(e){
        e.preventDefault();
        messages.sendMessage(this, messengerId)
    });

    $('.send-message-form').keypress(function(e) {
        if (e.which == 13) {
            e.preventDefault()
            messages.sendMessage(this, messengerId)
        }
    });

    $('#attachment-chat-form').change(function(){
        $('.attachment-block').removeClass('d-none');
        imagePreview(this, '.attachment-preview')
    })

    $('.cancel-attachment').on('click', function(){
        $('#attachment-chat-form').val('')
        $('.attachment-block').addClass('d-none');
    })

    actionOnScroll('.wsus__chat_area_body', function (){
        messages.fetchMessages(messengerId);
    }, true)
});
