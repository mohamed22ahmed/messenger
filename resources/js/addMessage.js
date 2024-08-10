export function addingMessageAndOrImage(message, attachment){
    if(message && attachment)
        addMessageAndAttachment(message, attachment);
    else{
        if(message)
            addMessage(message)
        if(attachment)
            addImage(attachment)
    }
}

function addMessage(message){
    let content = `
        <div class="wsus__single_chat_area">
            <div class="wsus__single_chat chat_right">
                <p class="messages">${message}</p>
                <span class="clock"><i class="fas fa-clock"></i> Now</span>

                <a class="action" href="#"><i class="fas fa-trash" aria-hidden="true"></i></a>
            </div>
        </div>
    `;

    $('.wsus__chat_area_body').append(content)
}

function addImage(attachment){
    let content = `
        <div class="wsus__single_chat_area">
            <div class="wsus__single_chat chat_right">
                <a class="venobox" data-gall="gallery01" href="${attachment}">
                    <img src="${attachment}" alt="gallery1" class="img-fluid w-100">
                </a>
                <span class="time"> 5h ago</span>
                <a class="action" href="#"><i class="fas fa-trash"></i></a>
            </div>
        </div>
    `;

    $('.wsus__chat_area_body').append(content)
}

function addMessageAndAttachment(message, attachment){
    let content = `
        <div class="wsus__single_chat_area">
            <div class="wsus__single_chat chat_right">
                <a class="venobox" data-gall="gallery01" href="${attachment}">
                    <img src="${attachment}" alt="gallery1" class="img-fluid w-100">
                </a>
                <p class="messages">${message}</p>
                <span class="time"> 5h ago</span>
                <a class="action" href="#"><i class="fas fa-trash"></i></a>
            </div>
        </div>
    `;

    $('.wsus__chat_area_body').append(content)
}
