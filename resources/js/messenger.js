let messengerId = 0;

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
        }
    })
}

function scrollToBottom() {
    $('.wsus__chat_area_body').scrollTop($('.wsus__chat_area_body')[0].scrollHeight);
}

function addMessage(message){
    let content = `
        <div class="wsus__single_chat_area">
            <div class="wsus__single_chat chat_right">
                <p class="messages">${message}</p>
                <span class="clock"><i class="fas fa-clock"></i> 5h ago</span>

                <a class="action" href="#"><i class="fas fa-trash" aria-hidden="true"></i></a>
            </div>
        </div>
    `;

    $('.wsus__chat_area_body').append(content)
    $('.message_body').val('').focus()
    scrollToBottom();
}

function getParameterByName(name, serializedData) {
    var match = serializedData.match(new RegExp('(^|&)' + name + '=([^&]*)'));
    return match ? decodeURIComponent(match[2].replace(/\+/g, ' ')) : null;
}

function sendMessage(formData){
    var message = getParameterByName('message', formData);
    addMessage(message)
    $.ajax({
        method: 'POST',
        url: '/send-message',
        data: formData,

        success: function (data){
            notyf.success(data.result)
            $('.wsus__single_chat_area span').remove();
            $('.wsus__single_chat_area p').after('<span class="time"> 5h ago</span>');
        },
        error: function(xhr, status, error){
            let errors = xhr.responseJSON.errors
            $.each(errors, function (index, value){
                notyf.error(value[0]);
            })
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
        let formData = $(this).serialize();
        formData += '&reciever='+messengerId
        sendMessage(formData)
    });

    $('.send-message-form').keypress(function(e) {
        if (e.which == 13) {
            e.preventDefault();
            $('.send-message-form').submit();
        }
    });
});
