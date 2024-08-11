let emojiPicker = $("#example1").emojioneArea();
let messagePage = 1;
let userTempID = 0;
let noMoreMessages = false;

function resetValues(){
    scrollToBottom();
    emojiPicker[0].emojioneArea.setText('');
    emojiPicker[0].emojioneArea.setFocus();
    $('#attachment-chat-form').val('')
    $('.attachment-block').addClass('d-none');
}

function scrollToBottom() {
    $('.wsus__chat_area_body').scrollTop($('.wsus__chat_area_body')[0].scrollHeight);
}

export function sendMessage(value, userID){
    let formData = new FormData(value)
    var message = emojiPicker[0].emojioneArea.getText()
    formData.set('message', message);
    formData.append('reciever', userID)

    $.ajax({
        method: 'POST',
        url: '/send-message',
        data: formData,
        processData: false,
        contentType: false,

        success: function (data){
            notyf.success(data.result)
            $('.wsus__chat_area_body').append(data.html);
            resetValues()
        },
        error: function(xhr, status, error){
            let errors = xhr.responseJSON.errors
            $.each(errors, function (index, value){
                notyf.error(value[0]);
            })
        }
    })
}

export function fetchMessages(id){
    if(userTempID != id){
        messagePage = 1;
        noMoreMessages = false;
    }

    userTempID = id;

    if(!noMoreMessages){
        $.ajax({
            method: "GET",
            url: '/fetch-messages',
            data: {id: id,page: messagePage},

            success: function(data){
                let content = $('.wsus__chat_area_body').html()
                console.log(content)
                if(messagePage <2){
                    $('.wsus__chat_area_body').html(data.html);
                }else{

                    $('.wsus__chat_area_body').html(data.html)
                    $('.wsus__chat_area_body').append(content)
                }
                noMoreMessages = messagePage >= data.last_page
                if(!noMoreMessages) messagePage++;
            }
        })
    }
}
