
/* =========================================================
   APEX AI — ADVANCED CHATBOT (ChatGPT/Claude/Gemini Style)
   Features: SSE Streaming · Markdown Rendering · Code Blocks
   Copy · Regenerate · Voice Input/Output · Export · Stop
   ========================================================= */

/* --- Global helpers (called via inline onclick) --- */
function copyMessage(btn) {
    const bubble = btn.closest('.chatbot-msg-bubble');
    const content = bubble ? (bubble.querySelector('.bot-msg-content') || bubble) : btn;
    const text = (content.innerText || content.textContent || '').trim();
    navigator.clipboard.writeText(text).then(() => {
        btn.innerHTML = '<i class="uil uil-check"></i>';
        btn.style.color = '#00f5d4';
        setTimeout(() => { btn.innerHTML = '<i class="uil uil-copy"></i>'; btn.style.color = ''; }, 2000);
    });
}

window.copyCode = function(btn) {
    const code = btn.closest('.code-block')?.querySelector('code');
    if (!code) return;
    navigator.clipboard.writeText(code.innerText).then(() => {
        btn.innerHTML = '<i class="uil uil-check"></i> Copied!';
        setTimeout(() => { btn.innerHTML = '<i class="uil uil-copy"></i> Copy'; }, 2000);
    });
};

function initChatbot() {

    /* ---- DOM ---- */
    const fab        = document.getElementById('chatbotFab');
    const panel      = document.getElementById('chatbotPanel');
    const closeBtn   = document.getElementById('chatbotClose');
    const clearBtn   = document.getElementById('chatbotClear');
    const exportBtn  = document.getElementById('chatbotExport');
    const voiceBtn   = document.getElementById('chatbotVoice');
    const micBtn     = document.getElementById('chatbotMic');
    const sendBtn    = document.getElementById('chatbotSend');
    const stopBtn    = document.getElementById('chatbotStop');
    const inputEl    = document.getElementById('chatbotInput');
    const messagesEl = document.getElementById('chatbotMessages');
    const suggestEl  = document.getElementById('chatbotSuggestions');
    const badge      = document.getElementById('chatbotBadge');
    const statusText = document.getElementById('chatbotStatusText');
    const chips      = document.querySelectorAll('.chatbot-chip');

    if (!fab || !panel || !inputEl || !messagesEl) return;

    /* ---- State ---- */
    let isOpen            = false;
    let isStreaming       = false;
    let isVoiceEnabled    = false;
    let isListening       = false;
    let currentReader     = null;
    let conversationHistory = [];
    let lastUserMessage   = '';
    let streamingBubbleEl = null;
    let streamingText     = '';

    /* ---- TTS Setup ---- */
    const synth = window.speechSynthesis;
    let ttsVoice = null;
    if (synth) {
        const pickVoice = () => {
            const v = synth.getVoices();
            ttsVoice = v.find(x => x.name.includes('Google UK English Female'))
                    || v.find(x => x.name.includes('Google US English'))
                    || v.find(x => x.name.includes('Zira'))
                    || v.find(x => x.name.includes('Samantha'))
                    || v[0];
        };
        if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = pickVoice;
        pickVoice();
    }

    function speakText(text) {
        if (!isVoiceEnabled || !synth) return;
        synth.cancel();
        const clean = text.replace(/```[\s\S]*?```/g, '').replace(/[*_`#>]/g, '').replace(/<[^>]+>/g, '').trim();
        if (!clean) return;
        const utt = new SpeechSynthesisUtterance(clean);
        if (ttsVoice) utt.voice = ttsVoice;
        utt.pitch = 1.1; utt.rate = 1.05;
        synth.speak(utt);
    }

    /* ---- STT (Voice Input) ---- */
    let recognition = null;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SR) {
        recognition = new SR();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            isListening = true;
            if (micBtn) { micBtn.classList.add('listening'); micBtn.title = 'Listening...'; }
            if (statusText) statusText.textContent = '🎤 Listening...';
        };
        recognition.onresult = (e) => {
            const transcript = Array.from(e.results).map(r => r[0].transcript).join('');
            if (inputEl) { inputEl.value = transcript; autoResize(); }
        };
        recognition.onend = () => {
            isListening = false;
            if (micBtn) { micBtn.classList.remove('listening'); micBtn.title = 'Voice Input'; }
            if (statusText) statusText.textContent = 'Online · Ready to help';
        };
        recognition.onerror = () => { isListening = false; if (micBtn) micBtn.classList.remove('listening'); };
    } else {
        if (micBtn) micBtn.style.display = 'none';
    }

    /* ---- Helpers ---- */
    const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    function scrollBottom() {
        requestAnimationFrame(() => {
            messagesEl.scrollTo({ top: messagesEl.scrollHeight, behavior: 'smooth' });
        });
    }

    function setStatus(text) {
        if (statusText) statusText.textContent = text;
    }

    /* ---- Advanced Markdown Renderer ---- */
    function markdownToHtml(md) {
        let html = md;

        // Fenced code blocks
        html = html.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) => {
            const escaped = code.trim()
                .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            const langLabel = lang ? `<span class="code-lang">${lang}</span>` : '';
            return `<div class="code-block">`
                + `<div class="code-header">${langLabel}`
                + `<button class="code-copy-btn" onclick="copyCode(this)"><i class="uil uil-copy"></i> Copy</button>`
                + `</div><pre><code>${escaped}</code></pre></div>`;
        });

        // Headers
        html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
        html = html.replace(/^## (.+)$/gm,  '<h2>$1</h2>');
        html = html.replace(/^# (.+)$/gm,   '<h1>$1</h1>');

        // Bold + italic
        html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
        html = html.replace(/\*\*(.+?)\*\*/g,      '<strong>$1</strong>');
        html = html.replace(/\*(.+?)\*/g,          '<em>$1</em>');
        html = html.replace(/_(.+?)_/g,            '<em>$1</em>');

        // Inline code
        html = html.replace(/`([^`\n]+)`/g, '<code class="inline-code">$1</code>');

        // Blockquote
        html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');

        // Links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

        // Process lists
        const lines = html.split('\n');
        const out = [];
        let inUl = false, inOl = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const ulM = line.match(/^[-*•] (.+)/);
            const olM = line.match(/^\d+\. (.+)/);

            if (ulM) {
                if (!inUl) { if (inOl) { out.push('</ol>'); inOl = false; } out.push('<ul>'); inUl = true; }
                out.push(`<li>${ulM[1]}</li>`);
            } else if (olM) {
                if (!inOl) { if (inUl) { out.push('</ul>'); inUl = false; } out.push('<ol>'); inOl = true; }
                out.push(`<li>${olM[1]}</li>`);
            } else {
                if (inUl) { out.push('</ul>'); inUl = false; }
                if (inOl) { out.push('</ol>'); inOl = false; }
                if (line.trim() === '') {
                    // skip empty lines (paragraph breaks handled by p tags)
                } else if (line.startsWith('<')) {
                    out.push(line);
                } else {
                    out.push(`<p>${line}</p>`);
                }
            }
        }
        if (inUl) out.push('</ul>');
        if (inOl) out.push('</ol>');

        return out.join('');
    }

    /* ---- Show/Hide Stop Button ---- */
    function showStopBtn() {
        if (sendBtn) sendBtn.style.display = 'none';
        if (stopBtn) stopBtn.style.display = 'flex';
    }
    function hideStopBtn() {
        if (sendBtn) sendBtn.style.display = 'flex';
        if (stopBtn) stopBtn.style.display = 'none';
    }

    /* ---- Append User Message ---- */
    function appendUserMessage(content) {
        const row = document.createElement('div');
        row.classList.add('chatbot-msg', 'user-msg');
        const escaped = content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        row.innerHTML = `
            <div class="chatbot-msg-bubble">
                <div class="bot-msg-content"><p>${escaped}</p></div>
                <div class="chatbot-msg-footer">
                    <span class="chatbot-msg-time">${getTime()}</span>
                </div>
            </div>`;
        messagesEl.appendChild(row);
        scrollBottom();
        return row;
    }

    /* ---- Append Bot Message (Static) ---- */
    function appendBotMessage(content, isError = false) {
        const row = document.createElement('div');
        row.classList.add('chatbot-msg', 'bot-msg');
        if (isError) row.classList.add('error-msg');
        const bubbleId = 'bmsg-' + Date.now();
        row.innerHTML = `
            <div class="chatbot-msg-avatar"><i class="uil uil-robot"></i></div>
            <div class="chatbot-msg-bubble">
                <div id="${bubbleId}" class="bot-msg-content"></div>
                <div class="chatbot-msg-footer">
                    <span class="chatbot-msg-time">${getTime()}</span>
                    <div class="msg-actions">
                        <button class="msg-copy-btn" title="Copy" onclick="copyMessage(this)"><i class="uil uil-copy"></i></button>
                        <button class="msg-regen-btn" title="Regenerate" onclick="window._apexRegen&&window._apexRegen()"><i class="uil uil-redo"></i></button>
                    </div>
                </div>
            </div>`;
        messagesEl.appendChild(row);
        scrollBottom();
        const el = document.getElementById(bubbleId);
        if (el) el.innerHTML = markdownToHtml(content);
        if (!isError && isVoiceEnabled) speakText(content);
        scrollBottom();
        return row;
    }

    /* ---- Create Streaming Bubble ---- */
    function createStreamBubble() {
        const row = document.createElement('div');
        row.classList.add('chatbot-msg', 'bot-msg', 'streaming-msg');
        const id = 'bstream-' + Date.now();
        row.innerHTML = `
            <div class="chatbot-msg-avatar"><i class="uil uil-robot"></i></div>
            <div class="chatbot-msg-bubble">
                <div id="${id}" class="bot-msg-content streaming-content"></div>
                <div class="chatbot-msg-footer">
                    <span class="chatbot-msg-time">${getTime()}</span>
                    <div class="msg-actions">
                        <button class="msg-copy-btn" title="Copy" onclick="copyMessage(this)"><i class="uil uil-copy"></i></button>
                        <button class="msg-regen-btn" title="Regenerate" onclick="window._apexRegen&&window._apexRegen()"><i class="uil uil-redo"></i></button>
                    </div>
                </div>
            </div>`;
        messagesEl.appendChild(row);
        streamingBubbleEl = document.getElementById(id);
        scrollBottom();
        return row;
    }

    /* ---- Typing Indicator ---- */
    let typingEl = null;
    function showTyping() {
        typingEl = document.createElement('div');
        typingEl.classList.add('chatbot-typing');
        typingEl.innerHTML = `
            <div class="chatbot-msg-avatar"><i class="uil uil-robot"></i></div>
            <div class="chatbot-typing-bubble">
                <span></span><span></span><span></span>
            </div>`;
        messagesEl.appendChild(typingEl);
        scrollBottom();
    }
    function hideTyping() { if (typingEl) { typingEl.remove(); typingEl = null; } }

    /* ---- SEND MESSAGE — SSE Streaming ---- */
    async function sendMessage(userText) {
        userText = userText.trim();
        if (!userText || isStreaming) return;

        lastUserMessage = userText;
        suggestEl?.classList.add('hidden');
        appendUserMessage(userText);
        conversationHistory.push({ role: 'user', content: userText });

        isStreaming = true;
        showStopBtn();
        showTyping();
        setStatus('Apex is thinking...');
        streamingText = '';
        streamingBubbleEl = null;

        try {
            const resp = await fetch('/api/chat/stream', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: conversationHistory })
            });

            if (!resp.ok) {
                const e = await resp.json().catch(() => ({}));
                throw new Error(e.error || `HTTP ${resp.status}`);
            }

            hideTyping();
            createStreamBubble();
            setStatus('Apex is typing...');

            const reader = resp.body.getReader();
            currentReader = reader;
            const dec = new TextDecoder();
            let buf = '';

            outer: while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buf += dec.decode(value, { stream: true });
                const lines = buf.split('\n');
                buf = lines.pop();

                for (const line of lines) {
                    const t = line.trim();
                    if (!t.startsWith('data: ')) continue;
                    const data = t.slice(6);
                    if (data === '[DONE]') break outer;
                    
                    let parsed;
                    try {
                        parsed = JSON.parse(data);
                    } catch (ex) { continue; }

                    if (parsed.error) throw new Error(parsed.error);
                    if (parsed.content) {
                        streamingText += parsed.content;
                        if (streamingBubbleEl) {
                            streamingBubbleEl.innerHTML = markdownToHtml(streamingText)
                                + '<span class="stream-cursor">▋</span>';
                            scrollBottom();
                        }
                        // Add artificial delay for realistic typing effect
                        await new Promise(r => setTimeout(r, 15));
                    }
                }
            }

            // Finalize streaming bubble
            if (streamingBubbleEl) {
                streamingBubbleEl.innerHTML = markdownToHtml(streamingText);
                streamingBubbleEl.closest('.streaming-msg')?.classList.remove('streaming-msg');
            }
            conversationHistory.push({ role: 'assistant', content: streamingText });
            if (isVoiceEnabled) speakText(streamingText);
            setStatus('Online · Ready to help');

        } catch (err) {
            hideTyping();
            if (err.name === 'AbortError' || streamingText) {
                // Partial response — finalize it
                if (streamingBubbleEl && streamingText) {
                    streamingBubbleEl.innerHTML = markdownToHtml(streamingText);
                    streamingBubbleEl.closest('.streaming-msg')?.classList.remove('streaming-msg');
                    conversationHistory.push({ role: 'assistant', content: streamingText });
                }
            } else {
                if (streamingBubbleEl) {
                    streamingBubbleEl.closest('.chatbot-msg')?.remove();
                    streamingBubbleEl = null;
                }
                // Fallback to non-streaming
                try {
                    const fb = await fetch('/api/chat', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ messages: conversationHistory })
                    });
                    const d = await fb.json();
                    const reply = d.reply || 'Sorry, I could not get a response.';
                    appendBotMessage(reply);
                    conversationHistory.push({ role: 'assistant', content: reply });
                } catch {
                    appendBotMessage(`⚠️ Error: ${err.message}. Please try again.`, true);
                }
            }
            setStatus('Online · Ready to help');
        } finally {
            isStreaming = false;
            currentReader = null;
            hideStopBtn();
            if (window.innerWidth > 768) {
                inputEl.focus();
            }
            scrollBottom();
        }
    }

    /* ---- Regenerate ---- */
    window._apexRegen = function() {
        if (!lastUserMessage || isStreaming) return;
        // Remove last assistant message from history
        if (conversationHistory.length >= 2 && conversationHistory[conversationHistory.length - 1].role === 'assistant') {
            conversationHistory.pop();
        }
        sendMessage(lastUserMessage);
    };

    /* ---- Export Chat ---- */
    function exportChat() {
        const msgs = messagesEl.querySelectorAll('.chatbot-msg');
        let text = `APEX AI CHAT EXPORT\n${'═'.repeat(40)}\n\n`;
        msgs.forEach(m => {
            const isUser = m.classList.contains('user-msg');
            const content = (m.querySelector('.bot-msg-content')?.innerText || '').trim();
            if (content) text += `${isUser ? '👤 You' : '🤖 Apex'}: ${content}\n\n`;
        });
        text += `${'─'.repeat(40)}\nExported: ${new Date().toLocaleString()}`;
        const blob = new Blob([text], { type: 'text/plain' });
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement('a');
        a.href = url; a.download = `apex-chat-${Date.now()}.txt`;
        document.body.appendChild(a); a.click();
        document.body.removeChild(a); URL.revokeObjectURL(url);
    }

    /* ---- Open / Close ---- */
    function openChat() {
        isOpen = true;
        panel.classList.add('open');
        panel.setAttribute('aria-hidden', 'false');
        fab.classList.add('active');
        if (badge) badge.classList.add('hidden');
        if (window.innerWidth <= 768) {
            document.body.classList.add('chatbot-open');
            inputEl.blur(); // Prevent virtual keyboard from opening on mobile
        } else {
            setTimeout(() => inputEl.focus(), 350);
        }
        scrollBottom();
    }

    function closeChat() {
        isOpen = false;
        panel.classList.remove('open');
        panel.setAttribute('aria-hidden', 'true');
        fab.classList.remove('active');
        document.body.classList.remove('chatbot-open');
        inputEl.blur();
        if (window.innerWidth <= 768) {
            panel.style.height = '';
            panel.style.top = '';
        }
    }

    function clearChat() {
        conversationHistory = [];
        lastUserMessage = '';
        messagesEl.innerHTML = `
            <div class="chatbot-msg bot-msg">
                <div class="chatbot-msg-avatar"><i class="uil uil-robot"></i></div>
                <div class="chatbot-msg-bubble">
                    <div class="bot-msg-content">
                        <p>Hi, I'm <strong>Apex</strong> 👋 Chat cleared! Ask me anything about Rupam.</p>
                    </div>
                    <div class="chatbot-msg-footer">
                        <span class="chatbot-msg-time">Just now</span>
                        <button class="msg-copy-btn" onclick="copyMessage(this)"><i class="uil uil-copy"></i></button>
                    </div>
                </div>
            </div>`;
        suggestEl?.classList.remove('hidden');
        if (synth) synth.cancel();
    }

    /* ---- Auto-resize Textarea ---- */
    function autoResize() {
        inputEl.style.height = 'auto';
        inputEl.style.height = Math.min(inputEl.scrollHeight, 140) + 'px';
    }

    /* ---- Visual Viewport Keyboard Handling (Mobile) ---- */
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', () => {
            if (isOpen && window.innerWidth <= 768) {
                const vh = window.visualViewport.height;
                const topOffset = window.visualViewport.offsetTop || 0;
                panel.style.height = `${vh}px`;
                panel.style.top = `${topOffset}px`;
                scrollBottom();
            }
        });
        window.visualViewport.addEventListener('scroll', () => {
            if (isOpen && window.innerWidth <= 768) {
                const topOffset = window.visualViewport.offsetTop || 0;
                panel.style.top = `${topOffset}px`;
            }
        });
    }

    /* ---- Event Listeners ---- */
    fab.addEventListener('click', () => isOpen ? closeChat() : openChat());
    closeBtn?.addEventListener('click', closeChat);
    clearBtn?.addEventListener('click', clearChat);
    exportBtn?.addEventListener('click', exportChat);

    voiceBtn?.addEventListener('click', () => {
        isVoiceEnabled = !isVoiceEnabled;
        voiceBtn.classList.toggle('muted', !isVoiceEnabled);
        const icon = voiceBtn.querySelector('i');
        if (icon) icon.className = isVoiceEnabled ? 'uil uil-volume' : 'uil uil-volume-mute';
        voiceBtn.title = isVoiceEnabled ? 'Mute TTS' : 'Unmute TTS';
        if (!isVoiceEnabled && synth) synth.cancel();
    });

    micBtn?.addEventListener('click', () => {
        if (!recognition) return;
        if (isListening) recognition.stop();
        else recognition.start();
    });

    stopBtn?.addEventListener('click', async () => {
        if (currentReader) {
            try { await currentReader.cancel('User stopped'); } catch {}
        }
        isStreaming = false;
        hideTyping();
        hideStopBtn();
        if (streamingBubbleEl && streamingText) {
            streamingBubbleEl.innerHTML = markdownToHtml(streamingText);
            streamingBubbleEl.closest('.streaming-msg')?.classList.remove('streaming-msg');
            conversationHistory.push({ role: 'assistant', content: streamingText });
        }
        setStatus('Online · Ready to help');
    });

    sendBtn.addEventListener('click', () => {
        const text = inputEl.value;
        inputEl.value = '';
        autoResize();
        if (window.innerWidth <= 768) {
            inputEl.blur(); // Dismiss keyboard on mobile after submit
        }
        sendMessage(text);
    });

    inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const text = inputEl.value;
            inputEl.value = '';
            autoResize();
            if (window.innerWidth <= 768) {
                inputEl.blur(); // Dismiss keyboard on mobile after submit
            }
            sendMessage(text);
        }
    });

    inputEl.addEventListener('input', autoResize);

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const msg = chip.getAttribute('data-msg');
            if (msg) {
                if (window.innerWidth <= 768) {
                    inputEl.blur();
                }
                sendMessage(msg);
            }
        });
    });

    // Close on outside click (Desktop only)
    document.addEventListener('click', (e) => {
        if (isOpen && window.innerWidth > 768 && !panel.contains(e.target) && !fab.contains(e.target)) {
            closeChat();
        }
    });

    // Auto-open after 5s on first visit — ONLY on desktop, not mobile
    if (!sessionStorage.getItem('apex_visited') && window.innerWidth > 768) {
        sessionStorage.setItem('apex_visited', '1');
        setTimeout(() => { if (!isOpen) openChat(); }, 5000);
    } else {
        sessionStorage.setItem('apex_visited', '1');
    }
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
} else {
    initChatbot();
}
