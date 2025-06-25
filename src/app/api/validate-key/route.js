import { supabase } from '../../../lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    const apiKey = body.apiKey;
    if (!apiKey) {
      return Response.json({ valid: false, message: 'API key is required.' }, { status: 400 });
    }
    const { data } = await supabase
      .from('api_keys')
      .select('id')
      .eq('key', apiKey)
      .single();
    if (data) {
      return Response.json({ valid: true, message: 'Valid API Key' });
    } else {
      return Response.json({ valid: false, message: 'Not valid API Key' });
    }
  } catch (error) {
    return Response.json({ valid: false, message: 'Server error.' }, { status: 500 });
  }
} 