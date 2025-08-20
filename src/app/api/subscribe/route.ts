// Location: app/api/subscribe/route.ts

import { createClient } from '@supabase/supabase-js';
import { type NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  console.log(email);

  if (!email) {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
  }

  try {
    const { error } = await supabase.from('Subscribers').insert({ email });

    if (error) {
      if (error.code === '23505') {
        // Return a success status, but with a specific 'info' type
        return NextResponse.json({ 
          message: 'You are already on the list!',
          status: 'info' // This is the new signal for our frontend
        });
      }
      throw error;
    }

    return NextResponse.json({ 
      message: 'Success! You have been subscribed.',
      status: 'success' 
    });

  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}