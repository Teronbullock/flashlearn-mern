export const handler = async () => {
  const { DATABASE_PROJECT_REF, SUPABASE_ANON_KEY } = process.env;

  if (!DATABASE_PROJECT_REF || !SUPABASE_ANON_KEY) {
    console.error('Missing environment variables:', {
      hasProjectRef: !!DATABASE_PROJECT_REF,
      hasAnonKey: !!SUPABASE_ANON_KEY
    });
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing Supabase configuration' }),
    };
  }

  const url = `https://${DATABASE_PROJECT_REF}.supabase.co/rest/v1/fc_users?limit=1`;
  
  try {
    console.log('Pinging Supabase at:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        apikey: SUPABASE_ANON_KEY,
      },
    });

    const data = await response.text();
    console.log('Supabase response:', response.status, data);

    if (!response.ok) {
      throw new Error(`Supabase returned ${response.status}: ${data}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Supabase is alive!',
        timestamp: new Date().toISOString()
      }),
    };
  } catch (error) {
    console.error('Keep-alive error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};