import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { SupabaseService } from "src/services/supabase.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})

export class AuthComponent {
  user: any = null;

  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    this.user = await this.supabase.getUser();
  }

  async signInWithGoogle() {
    await this.supabase.signInWithGoogle();
  }

  async signOut() {
    await this.supabase.signOut();
  }
}
