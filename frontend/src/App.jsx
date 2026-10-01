import { useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [isThinking, setIsThinking] = useState(false)

  const handleSend = async () => {
    if (!message.trim() || isThinking) return

    const userMessage = {
      role: 'user',
      content: message,
    }

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
    ])

    const userInput = message
    setMessage('')
    setIsThinking(true)

    try {
      const response = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userInput,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to communicate with the backend')
      }

      const data = await response.json()

      const assistantResponse = data.message

      const assistantMessage = {
        role: 'assistant',
        content: assistantResponse,
      }

      setMessages((previousMessages) => [
        ...previousMessages,
        assistantMessage,
      ])
    } catch (error) {
      console.error('Backend error:', error)

      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I could not connect to PersonalPilot.',
      }

      setMessages((previousMessages) => [
        ...previousMessages,
        errorMessage,
      ])
    } finally {
      setIsThinking(false)
    }
  }

  return (
    <div className="app">

      <header className="header">
        <h1>PersonalPilot</h1>
        <p>Your Personal AI Agent</p>
      </header>

      <main className="chat">

        {messages.length === 0 && !isThinking ? (
          <div className="welcome">
            <h2>What can I help you accomplish?</h2>
            <p>
              Tell me what you want to do, and I'll figure out the steps.
            </p>
          </div>
        ) : (
          <div className="messages">

            {messages.map((message, index) => (
              <div
                key={index}
                className={`message-row ${message.role}`}
              >
                <div className="message-content">

                  <div className="message-name">
                    {message.role === 'user'
                      ? 'You'
                      : 'PersonalPilot'}
                  </div>

                  <div className="message-bubble">
                    {message.content}
                  </div>

                </div>
              </div>
            ))}

            {isThinking && (
              <div className="message-row assistant">
                <div className="message-content">

                  <div className="message-name">
                    PersonalPilot
                  </div>

                  <div className="message-bubble thinking">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                </div>
              </div>
            )}

          </div>
        )}

      </main>

      <div className="input-area">

        <input
          type="text"
          placeholder="I'm hungry, I want chicken biryani."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSend()
            }
          }}
          disabled={isThinking}
        />

        <button
          onClick={handleSend}
          disabled={isThinking}
        >
          {isThinking ? 'Thinking...' : 'Send'}
        </button>

      </div>

    </div>
  )
}

export default App