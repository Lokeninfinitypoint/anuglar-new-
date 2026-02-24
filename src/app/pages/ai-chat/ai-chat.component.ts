import { Component, signal, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface IdeaCard {
  category: string;
  categoryColor: string;
  title: string;
  image: string;
  icon?: string;
}

interface RecentItem {
  id: string;
  title: string;
}

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="ai-agent-page">
      <!-- Customize Button -->
      <button class="customize-btn">
        <i class="ri-settings-4-line"></i>
        Customize
      </button>

      @if (!isConversationMode()) {
        <!-- Welcome State - ActiveCampaign Style -->
        <div class="welcome-container">
          <!-- Hero Headline -->
          <h1 class="hero-headline">
            Let's automate <span class="highlight">MarketingTool's</span> success
          </h1>

          <!-- Main Input -->
          <div class="main-input-container">
            <div class="main-input glass">
              <input
                type="text"
                [(ngModel)]="inputText"
                placeholder="What can I help you with?"
                (keydown.enter)="sendMessage()"
              />
              <button
                class="send-btn"
                [disabled]="!inputText().trim()"
                (click)="sendMessage()">
                <i class="ri-arrow-up-line"></i>
              </button>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="quick-actions">
            @for (action of quickActions; track action.label) {
              <button class="action-pill" (click)="sendMessage(action.prompt)">
                <i [class]="action.icon"></i>
                {{ action.label }}
              </button>
            }
          </div>

          <!-- Recents Section -->
          <div class="recents-section">
            <div class="section-header">
              <h2>Recents</h2>
              <button class="see-all-btn">See all <i class="ri-arrow-right-s-line"></i></button>
            </div>
            <div class="recents-list">
              @for (recent of recents; track recent.id) {
                <button class="recent-card glass" (click)="loadConversation(recent)">
                  <span class="recent-title">{{ recent.title }}</span>
                </button>
              }
            </div>
          </div>

          <!-- Ideas Section -->
          <div class="ideas-section">
            <h2>Ideas to Build Engagement</h2>
            <div class="ideas-grid">
              @for (idea of ideas; track idea.title) {
                <button class="idea-card" (click)="sendMessage(idea.title)">
                  <span class="idea-category" [style.color]="idea.categoryColor">{{ idea.category }}</span>
                  <h3 class="idea-title">{{ idea.title }}</h3>
                  <div class="idea-preview">
                    @if (idea.icon) {
                      <div class="idea-icon">
                        <i [class]="idea.icon"></i>
                      </div>
                    } @else {
                      <div class="idea-image" [style.backgroundImage]="'url(' + idea.image + ')'"></div>
                    }
                  </div>
                </button>
              }
            </div>
          </div>
        </div>
      } @else {
        <!-- Conversation Mode -->
        <div class="conversation-container">
          <!-- Back Button -->
          <button class="back-btn" (click)="exitConversation()">
            <i class="ri-arrow-left-line"></i>
            New chat
          </button>

          <!-- Messages -->
          <div class="messages-area" #messagesArea>
            @for (message of messages(); track message.timestamp) {
              <div class="message" [class]="message.role">
                @if (message.role === 'assistant') {
                  <div class="message-avatar">
                    <i class="ri-robot-line"></i>
                  </div>
                }
                <div class="message-content">
                  <div class="message-text">{{ message.content }}</div>
                  <span class="message-time">{{ formatTime(message.timestamp) }}</span>
                </div>
              </div>
            }

            @if (isTyping()) {
              <div class="message assistant">
                <div class="message-avatar">
                  <i class="ri-robot-line"></i>
                </div>
                <div class="message-content">
                  <div class="typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            }
          </div>

          <!-- Input -->
          <div class="conversation-input">
            <div class="input-box glass">
              <input
                type="text"
                [(ngModel)]="inputText"
                placeholder="Type your message..."
                (keydown.enter)="sendMessage()"
              />
              <button
                class="send-btn"
                [disabled]="!inputText().trim()"
                (click)="sendMessage()">
                <i class="ri-arrow-up-line"></i>
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    /* ═══════════════════════════════════════════════════════════════════════════
       AI AGENT PAGE - ACTIVECAMPAIGN STYLE
    ═══════════════════════════════════════════════════════════════════════════ */

    .ai-agent-page {
      position: relative;
      min-height: calc(100vh - 64px);
      padding: 40px;
    }

    .glass {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 12px;
    }

    /* Customize Button */
    .customize-btn {
      position: absolute;
      top: 40px;
      right: 40px;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 18px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      font-size: 14px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.8);
      cursor: pointer;
      transition: all 0.2s;
    }

    .customize-btn:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.12);
    }

    .customize-btn i {
      font-size: 16px;
    }

    /* ═══════════════════════════════════════════════════════════════════════════
       WELCOME STATE
    ═══════════════════════════════════════════════════════════════════════════ */

    .welcome-container {
      max-width: 900px;
      margin: 0 auto;
      padding-top: 60px;
    }

    /* Hero Headline */
    .hero-headline {
      font-size: 42px;
      font-weight: 400;
      font-style: italic;
      text-align: center;
      color: rgba(255, 255, 255, 0.95);
      margin-bottom: 48px;
      line-height: 1.3;
      font-family: 'Cabinet Grotesk', -apple-system, sans-serif;
    }

    .hero-headline .highlight {
      background: linear-gradient(135deg, #818cf8 0%, #a78bfa 50%, #c4b5fd 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Main Input */
    .main-input-container {
      max-width: 680px;
      margin: 0 auto 24px;
    }

    .main-input {
      display: flex;
      align-items: center;
      padding: 8px 8px 8px 24px;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      transition: all 0.2s;
    }

    .main-input:focus-within {
      border-color: rgba(99, 102, 241, 0.4);
      box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
    }

    .main-input input {
      flex: 1;
      background: none;
      border: none;
      outline: none;
      font-size: 16px;
      color: #fff;
      font-family: inherit;
      padding: 12px 0;
    }

    .main-input input::placeholder {
      color: rgba(255, 255, 255, 0.35);
    }

    .send-btn {
      width: 44px;
      height: 44px;
      background: #4f46e5;
      border: none;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #fff;
      font-size: 20px;
      transition: all 0.2s;
      flex-shrink: 0;
    }

    .send-btn:hover:not(:disabled) {
      background: #4338ca;
      transform: scale(1.05);
    }

    .send-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    /* Quick Actions */
    .quick-actions {
      display: flex;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 64px;
    }

    .action-pill {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 20px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 100px;
      font-size: 14px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.8);
      cursor: pointer;
      transition: all 0.2s;
    }

    .action-pill:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.12);
      transform: translateY(-2px);
    }

    .action-pill i {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.6);
    }

    /* Recents Section */
    .recents-section {
      margin-bottom: 48px;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .section-header h2 {
      font-size: 18px;
      font-weight: 600;
      color: #fff;
    }

    .see-all-btn {
      display: flex;
      align-items: center;
      gap: 4px;
      background: none;
      border: none;
      font-size: 14px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      transition: color 0.2s;
    }

    .see-all-btn:hover {
      color: rgba(255, 255, 255, 0.8);
    }

    .recents-list {
      display: flex;
      gap: 12px;
      overflow-x: auto;
      padding-bottom: 8px;
    }

    .recents-list::-webkit-scrollbar {
      height: 4px;
    }

    .recents-list::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 2px;
    }

    .recent-card {
      flex-shrink: 0;
      padding: 16px 20px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.06);
      cursor: pointer;
      transition: all 0.2s;
      text-align: left;
    }

    .recent-card:hover {
      background: rgba(255, 255, 255, 0.04);
      border-color: rgba(255, 255, 255, 0.1);
    }

    .recent-title {
      font-size: 14px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.9);
      white-space: nowrap;
    }

    /* Ideas Section */
    .ideas-section h2 {
      font-size: 18px;
      font-weight: 600;
      color: #fff;
      margin-bottom: 20px;
    }

    .ideas-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }

    @media (max-width: 1100px) {
      .ideas-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 600px) {
      .ideas-grid {
        grid-template-columns: 1fr;
      }
    }

    .idea-card {
      background: linear-gradient(180deg, rgba(30, 30, 50, 0.8) 0%, rgba(20, 20, 35, 0.95) 100%);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 16px;
      padding: 20px;
      text-align: left;
      cursor: pointer;
      transition: all 0.3s;
      overflow: hidden;
    }

    .idea-card:hover {
      transform: translateY(-4px);
      border-color: rgba(99, 102, 241, 0.3);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
    }

    .idea-category {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
      display: block;
    }

    .idea-title {
      font-size: 15px;
      font-weight: 600;
      color: #fff;
      margin-bottom: 16px;
      line-height: 1.4;
    }

    .idea-preview {
      height: 100px;
      border-radius: 10px;
      overflow: hidden;
    }

    .idea-icon {
      width: 100%;
      height: 100%;
      background: rgba(99, 102, 241, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .idea-icon i {
      font-size: 36px;
      color: #818cf8;
    }

    .idea-image {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      background-color: rgba(255, 255, 255, 0.02);
    }

    /* ═══════════════════════════════════════════════════════════════════════════
       CONVERSATION MODE
    ═══════════════════════════════════════════════════════════════════════════ */

    .conversation-container {
      max-width: 800px;
      margin: 0 auto;
      height: calc(100vh - 144px);
      display: flex;
      flex-direction: column;
    }

    .back-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      background: none;
      border: none;
      font-size: 14px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.6);
      cursor: pointer;
      padding: 8px 0;
      margin-bottom: 24px;
      transition: color 0.2s;
    }

    .back-btn:hover {
      color: #fff;
    }

    .messages-area {
      flex: 1;
      overflow-y: auto;
      padding-right: 8px;
    }

    .message {
      display: flex;
      gap: 14px;
      margin-bottom: 24px;
    }

    .message.user {
      flex-direction: row-reverse;
    }

    .message-avatar {
      width: 36px;
      height: 36px;
      background: rgba(99, 102, 241, 0.15);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .message-avatar i {
      font-size: 18px;
      color: #818cf8;
    }

    .message-content {
      max-width: 70%;
    }

    .message-text {
      padding: 16px 20px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 16px;
      font-size: 14px;
      line-height: 1.7;
      color: rgba(255, 255, 255, 0.9);
      white-space: pre-wrap;
    }

    .message.user .message-text {
      background: rgba(99, 102, 241, 0.15);
      border-color: rgba(99, 102, 241, 0.25);
    }

    .message-time {
      display: block;
      font-size: 11px;
      color: rgba(255, 255, 255, 0.3);
      margin-top: 8px;
      padding-left: 4px;
    }

    .message.user .message-time {
      text-align: right;
      padding-right: 4px;
      padding-left: 0;
    }

    /* Typing Indicator */
    .typing-indicator {
      display: flex;
      gap: 6px;
      padding: 20px 24px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 16px;
    }

    .typing-indicator span {
      width: 8px;
      height: 8px;
      background: rgba(255, 255, 255, 0.4);
      border-radius: 50%;
      animation: typing 1.4s infinite ease-in-out;
    }

    .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
    .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

    @keyframes typing {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
      30% { transform: translateY(-8px); opacity: 1; }
    }

    /* Conversation Input */
    .conversation-input {
      padding-top: 24px;
    }

    .conversation-input .input-box {
      display: flex;
      align-items: center;
      padding: 8px 8px 8px 20px;
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.06);
    }

    .conversation-input .input-box:focus-within {
      border-color: rgba(99, 102, 241, 0.3);
    }

    .conversation-input input {
      flex: 1;
      background: none;
      border: none;
      outline: none;
      font-size: 14px;
      color: #fff;
      font-family: inherit;
      padding: 10px 0;
    }

    .conversation-input input::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }

    .conversation-input .send-btn {
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }

    /* ═══════════════════════════════════════════════════════════════════════════
       RESPONSIVE
    ═══════════════════════════════════════════════════════════════════════════ */

    @media (max-width: 768px) {
      .ai-agent-page {
        padding: 24px;
      }

      .customize-btn {
        top: 24px;
        right: 24px;
        padding: 8px 14px;
        font-size: 13px;
      }

      .welcome-container {
        padding-top: 40px;
      }

      .hero-headline {
        font-size: 28px;
        margin-bottom: 32px;
      }

      .quick-actions {
        margin-bottom: 48px;
      }

      .action-pill {
        padding: 10px 16px;
        font-size: 13px;
      }

      .message-content {
        max-width: 85%;
      }
    }
  `]
})
export class AiChatComponent {
  @ViewChild('messagesArea') messagesArea!: ElementRef;

  messages = signal<Message[]>([]);
  inputText = signal('');
  isTyping = signal(false);
  isConversationMode = signal(false);

  quickActions = [
    { icon: 'ri-mail-line', label: 'Create an email', prompt: 'Help me create a marketing email campaign' },
    { icon: 'ri-magic-line', label: 'Automate for me', prompt: 'Set up an automation workflow for my marketing' },
    { icon: 'ri-line-chart-line', label: 'Get Insights', prompt: 'Analyze my campaign performance and provide insights' },
  ];

  recents: RecentItem[] = [
    { id: '1', title: 'AI-Powered Marketing Tools Product Launch...' },
    { id: '2', title: 'Q1 Campaign Performance Analysis' },
    { id: '3', title: 'Email Automation Setup' },
  ];

  ideas: IdeaCard[] = [
    {
      category: 'Brand kit',
      categoryColor: '#a78bfa',
      title: "MarketingTool's Brand Kit",
      image: '/images/growth-marketing.jpg',
      icon: ''
    },
    {
      category: 'Contact Import',
      categoryColor: '#60a5fa',
      title: 'Add contacts to your account',
      image: '/images/social-networks.jpg',
      icon: ''
    },
    {
      category: 'Automate',
      categoryColor: '#34d399',
      title: 'Marketing AI onboarding series',
      image: '/images/automation.jpg',
      icon: ''
    },
    {
      category: 'Email',
      categoryColor: '#f472b6',
      title: 'Announce AI marketing platform launch',
      image: '/images/email-marketing.jpg',
      icon: ''
    }
  ];

  sendMessage(text?: string) {
    const messageText = text || this.inputText().trim();
    if (!messageText) return;

    this.isConversationMode.set(true);

    this.messages.update(msgs => [...msgs, {
      role: 'user',
      content: messageText,
      timestamp: new Date()
    }]);

    this.inputText.set('');
    this.isTyping.set(true);

    // Scroll to bottom
    setTimeout(() => {
      if (this.messagesArea) {
        this.messagesArea.nativeElement.scrollTop = this.messagesArea.nativeElement.scrollHeight;
      }
    }, 50);

    // Simulate AI response
    setTimeout(() => {
      this.isTyping.set(false);
      this.messages.update(msgs => [...msgs, {
        role: 'assistant',
        content: this.generateResponse(messageText),
        timestamp: new Date()
      }]);

      setTimeout(() => {
        if (this.messagesArea) {
          this.messagesArea.nativeElement.scrollTop = this.messagesArea.nativeElement.scrollHeight;
        }
      }, 50);
    }, 1500);
  }

  generateResponse(input: string): string {
    const responses = [
      "I've analyzed your request and here's my recommendation:\n\n1. Start with a strong hook that addresses your audience's pain point\n2. Highlight your unique value proposition\n3. Include a clear call-to-action\n\nWould you like me to draft specific copy based on these principles?",
      "Based on your requirements, here's a strategic approach:\n\n• Focus on emotional triggers that resonate with your target audience\n• Use data-driven messaging to build trust\n• A/B test different variations for optimization\n\nShall I create multiple versions for testing?",
      "Here's my analysis:\n\nYour campaign can be optimized by adjusting the targeting parameters and refreshing the creative assets. I recommend testing new ad formats and expanding to lookalike audiences.\n\nWant me to provide a detailed optimization plan?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  }

  loadConversation(recent: RecentItem) {
    this.isConversationMode.set(true);
    this.messages.set([{
      role: 'user',
      content: recent.title,
      timestamp: new Date(Date.now() - 3600000)
    }, {
      role: 'assistant',
      content: 'I\'ve loaded this conversation. How can I help you continue?',
      timestamp: new Date(Date.now() - 3500000)
    }]);
  }

  exitConversation() {
    this.isConversationMode.set(false);
    this.messages.set([]);
    this.inputText.set('');
  }
}
