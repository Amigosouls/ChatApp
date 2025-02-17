import { Component } from '@angular/core';
import { SupabaseService } from './services/supabase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  messages: any[] = [];
  newMessage: string = '';
  title:any;
  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    this.messages = await this.supabaseService.getMessages();

    this.supabaseService.subscribeToMessages((message: any) => {
      this.messages.push(message);
    });
  }

  async sendMessage() {
    if (this.newMessage.trim()) {
      await this.supabaseService.sendMessage('User1', this.newMessage);
      this.newMessage = '';
    }
  }
}
