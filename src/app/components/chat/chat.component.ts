import { Component } from '@angular/core';
import { SupabaseService } from 'src/services/supabase.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  messages: any[] = [];
  newMessage: string = '';
  title:any;
  constructor(private supabaseService: SupabaseService) {}
  user: any = null;
  messageText: string = '';
  async ngOnInit() {
    this.user = await this.supabaseService.getUser();
    this.messages = await this.supabaseService.getMessages();

    this.supabaseService.subscribeToMessages((message: any) => {
      this.messages.push(message);
    });
  }
  async sendMessage() {
    if (!this.messageText.trim()) return;

    await this.supabaseService.sendMessage(this.user.email, this.messageText);
    this.messageText = ''; // Clear input after sending
  }
}
