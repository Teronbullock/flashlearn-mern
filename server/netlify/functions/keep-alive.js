export const handler = async () => {
  const DATABASE_URL = process.env.DATABASE_URL;
  
  try {
    const response = await fetch(`${DATABASE_URL}/rest/v1/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.SUPABASE_ANON_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to ping Supabase: ${response.statusText}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Supabase is alive!' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
