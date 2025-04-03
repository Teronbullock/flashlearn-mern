export const handler = async () => {
  const { DATABASE_PROJECT_REF, SUPABASE_ANON_KEY } = process.env;

  try {
    console.log('Pinging Supabase...');
    // https://<PROJECT_REF>.supabase.co/rest/v1/todos?apikey=<ANON_KEY>
    const response = await fetch(
      `https://${DATABASE_PROJECT_REF}.supabase.co/rest/v1/fc_users?apikey=${SUPABASE_ANON_KEY}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          apikey: SUPABASE_ANON_KEY,
        },
      }
    );

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
