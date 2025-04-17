
import { supabase } from '@/lib/supabase';
import type { ArchitectureConfig } from '@/lib/supabase';

export const configService = {
  async getConfigs() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('architecture_configs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getConfig(id: string) {
    const { data, error } = await supabase
      .from('architecture_configs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async createConfig(config: Omit<ArchitectureConfig, 'id' | 'user_id' | 'created_at' | 'updated_at'>) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('architecture_configs')
      .insert({
        ...config,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateConfig(id: string, updates: Partial<ArchitectureConfig>) {
    const { data, error } = await supabase
      .from('architecture_configs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteConfig(id: string) {
    const { error } = await supabase
      .from('architecture_configs')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  async shareConfig(configId: string, recipientEmail: string) {
    // This would be implemented using a Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('share-config', {
      body: { configId, recipientEmail },
    });

    if (error) throw error;
    return data;
  }
};
