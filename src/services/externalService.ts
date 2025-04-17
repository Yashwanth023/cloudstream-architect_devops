
import { supabase } from '@/lib/supabase';

interface ApiCredentials {
  apiKey: string;
  endpoint: string;
  serviceName: string;
}

interface ServiceResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export const externalService = {
  async saveCredentials(credentials: ApiCredentials): Promise<ServiceResponse> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('external_services')
        .insert({
          user_id: user.id,
          service_name: credentials.serviceName,
          endpoint: credentials.endpoint,
          // Do not store API keys in the database directly
          // In a real app, this would be securely stored in Key Vault
          // For this demo, we'll store a reference and use an Edge Function
          is_configured: true
        });

      if (error) throw error;

      // Store the actual API key securely in a Supabase Edge Function
      const { error: edgeFnError } = await supabase.functions.invoke('store-api-key', {
        body: { 
          serviceId: credentials.serviceName,
          apiKey: credentials.apiKey 
        }
      });

      if (edgeFnError) throw edgeFnError;

      return { success: true };
    } catch (error: any) {
      console.error('Error saving credentials:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to save credentials' 
      };
    }
  },

  async listConnectedServices(): Promise<ServiceResponse> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('external_services')
        .select('id, service_name, endpoint, created_at')
        .eq('user_id', user.id);

      if (error) throw error;

      return { success: true, data };
    } catch (error: any) {
      console.error('Error listing services:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to retrieve connected services' 
      };
    }
  },

  async testConnection(serviceId: string): Promise<ServiceResponse> {
    try {
      // This would call a Supabase Edge Function that tests the connection
      const { data, error } = await supabase.functions.invoke('test-connection', {
        body: { serviceId }
      });

      if (error) throw error;

      return { success: true, data };
    } catch (error: any) {
      console.error('Error testing connection:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to test connection' 
      };
    }
  },

  async callExternalApi(serviceId: string, endpoint: string, payload: any): Promise<ServiceResponse> {
    try {
      // This would call a Supabase Edge Function that makes the API call
      const { data, error } = await supabase.functions.invoke('call-external-api', {
        body: { serviceId, endpoint, payload }
      });

      if (error) throw error;

      return { success: true, data };
    } catch (error: any) {
      console.error('Error calling external API:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to call external API' 
      };
    }
  }
};
