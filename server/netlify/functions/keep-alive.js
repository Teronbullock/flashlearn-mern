export const handler = async () => {
  const DATABASE_URL = process.env.DATABASE_URL;

  try {
    console.log('Pinging Supabase...');

    const response = await fetch(`${DATABASE_URL}/rest/v1/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        apikey: process.env.SUPABASE_ANON_KEY,
      },
    });

    if (!response.ok) {
      console.error(`Failed to ping Supabase: ${response.statusText}`);
      throw new Error(`Failed to ping Supabase: ${response.statusText}`);
    }

    console.log('Supabase is alive!');

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Supabase is alive!' }),
    };
  } catch (error) {
    console.error('Error in keep-alive function:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
