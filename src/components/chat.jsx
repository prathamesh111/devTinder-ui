import { useState } from "react";
import { useParams } from "react-router";

const Chat = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = (event) => {
    event.preventDefault();
    const text = message.trim();
    if (!text) return;

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: crypto.randomUUID(), text },
    ]);
    setMessage("");
  };

  return (
    <section className="mx-auto my-6 w-full max-w-3xl px-3 sm:my-10 sm:px-6">
      <div className="card h-[min(76dvh,48rem)] min-h-[28rem] overflow-hidden border border-base-300 bg-base-100 shadow-xl sm:h-[min(72dvh,48rem)]">
        <header className="flex items-center gap-3 border-b border-base-300 bg-base-200 px-4 py-3 sm:px-6">
          <div
            className="avatar placeholder"
            aria-hidden="true"
          >
            <div className="w-11 rounded-full bg-primary text-primary-content">
              <span className="text-lg">C</span>
            </div>
          </div>
          <div>
            <h1 className="font-semibold">Chat</h1>
            <p className="text-sm text-base-content/60">
              {id ? `Conversation with ${id}` : "Your conversation"}
            </p>
          </div>
        </header>

        <div
          className="flex flex-1 flex-col gap-3 overflow-y-auto p-4 sm:p-6"
          aria-live="polite"
          aria-label="Messages"
        >
          {messages.length === 0 ? (
            <div className="m-auto text-center">
              <p className="font-medium">No messages yet</p>
              <p className="mt-1 text-sm text-base-content/60">
                Send a message to start the conversation.
              </p>
            </div>
          ) : (
            messages.map((item) => (
              <div className="chat chat-end" key={item.id}>
                <div className="chat-bubble chat-bubble-primary break-words">
                  {item.text}
                </div>
              </div>
            ))
          )}
        </div>

        <form
          className="flex items-end gap-2 border-t border-base-300 bg-base-100 p-3 sm:gap-3 sm:p-4"
          onSubmit={handleSend}
        >
          <label className="sr-only" htmlFor="chat-message">
            Message
          </label>
          <textarea
            className="textarea textarea-bordered max-h-32 min-h-12 flex-1 resize-y"
            id="chat-message"
            name="message"
            placeholder="Write a message..."
            rows={1}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <button
            className="btn btn-primary min-h-12"
            type="submit"
            disabled={!message.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default Chat;