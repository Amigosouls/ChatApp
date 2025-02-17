import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://ryqkjvtoflzjccdyzjks.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5cWtqdnRvZmx6amNjZHl6amtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3ODk1MTQsImV4cCI6MjA1NTM2NTUxNH0.D7Y6sFKgGcc3kn3AtxEe9HXWnPfpIhs8dvwavXBxFNM'
    ,{auth: {
      autoRefreshToken: true,
      persistSession: true,
      
     // Disable multi-tab authentication sync
    }});
  }

  // Example: Fetch Messages
  async getMessages() {
    const { data, error } = await this.supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  }

  // Example: Send a Message
  async sendMessage(user: string, text: string) {
    const { data, error } = await this.supabase
      .from('messages')
      .insert([{ user, text }]);

    if (error) throw error;
    return data;
  }

  // Example: Real-time Subscription
  subscribeToMessages(callback: Function) {
    this.supabase
      .channel('realtime chat')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
        callback(payload.new);
      })
      .subscribe();
  }
}
