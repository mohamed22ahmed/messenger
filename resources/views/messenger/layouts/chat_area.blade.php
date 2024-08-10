<div class="wsus__chat_area">
    <div class="wsus__message_paceholder d-none"></div>
    <div class="wsus__message_paceholder blank" id="blankDiv"></div>

    <div class="wsus__chat_area_header">
        <div class="header_left chat-profile-image">
            <span class="back_to_list">
                <i class="fas fa-arrow-left"></i>
            </span>
            <img src="" alt="User" class="img-fluid">
            <h4 class="chat-profile-name"></h4>
        </div>
        <div class="header_right">
            <a href="#" class="favourite"><i class="fas fa-star"></i></a>
            <a href="#" class="go_home"><i class="fas fa-home"></i></a>
            <a href="#" class="info"><i class="fas fa-info-circle"></i></a>
        </div>
    </div>

    <div class="wsus__chat_area_body">

        <div class="wsus__single_chat_area">
            <div class="wsus__single_chat">
                <p class="messages">Hi, How are you ?</p>
                <span class="time"> 5h ago</span>
                <a class="action" href="#"><i class="fas fa-trash"></i></a>
            </div>
        </div>
    </div>

    <div class="wsus__chat_area_footer">
        <div class="footer_message">
            <div class="img d-none attachment-block">
                <img src="{{ asset('assets/images/chat_img.png') }}" alt="User" class="img-fluid attachment-preview">
                <span class="cancel-attachment"><i class="far fa-times"></i></span>
            </div>
            <form action="#" method="post" class="send-message-form" enctype="multipart/form-data">
                @csrf
                <div class="file">
                    <label for="attachment-chat-form"><i class="far fa-plus"></i></label>
                    <input type="file" hidden id="attachment-chat-form" name="attachment" accept="image/*">
                </div>
                <textarea rows="1" id="example1" class="message_body" placeholder="Type a message.." name="message"></textarea>
                <button type="submit"><i class="fas fa-paper-plane"></i></button>
            </form>
        </div>
    </div>
</div>
