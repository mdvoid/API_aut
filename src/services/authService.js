const supabase = require('../config/supabase');
const jwt = require('jsonwebtoken');
const { formatError } = require('../utils/responseFormatter');

class AuthService {
  async signUp(email, password) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${process.env.PUBLIC_URL}/auth/callback`
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      return {
        message: 'Registration successful! Please check your email for verification.',
        user: data.user
      };
    } catch (error) {
      throw new Error('Registration failed: ' + error.message);
    }
  }

  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw new Error(error.message);
      }

      const token = jwt.sign(
        { 
          sub: data.user.id,
          email: data.user.email,
          role: 'authenticated'
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return { token, user: data.user };
    } catch (error) {
      throw new Error('Authentication failed: ' + error.message);
    }
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error('Sign out failed: ' + error.message);
    }
  }
}

module.exports = new AuthService();