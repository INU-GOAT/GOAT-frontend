import "./css/Chat.css";

function Chat() {
  return (
    <div class="card">
      <div class="chat-header">대화방</div>
      <div class="chat-window">
        <ul class="message-list"></ul>
      </div>
      <div class="chat-input">
        <input
          type="text"
          class="message-input"
          placeholder="선수들과 자유롭게 대화를 나누세요"
        />
        <button class="send-button">보내기</button>
      </div>
    </div>
  );
}

export default Chat;
