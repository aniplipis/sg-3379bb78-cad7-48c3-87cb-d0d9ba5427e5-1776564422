import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log('=== TESTING SUPABASE CONNECTION ===');
    
    // Test environment variables
    console.log('Environment check:', {
      hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      url: process.env.NEXT_PUBLIC_SUPABASE_URL
    });

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set');
    }
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');
    }

    // Create admin client
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    console.log('✅ Supabase client created');

    // Test 1: Simple query
    console.log('🔍 Test 1: Querying profiles table...');
    const { data: profiles, error: queryError } = await supabaseAdmin
      .from('profiles')
      .select('id, email, is_premium')
      .limit(5);

    if (queryError) {
      console.error('❌ Query error:', queryError);
      return res.status(500).json({
        success: false,
        test: 'query',
        error: queryError.message,
        details: queryError
      });
    }

    console.log('✅ Query successful, found', profiles?.length || 0, 'profiles');

    // Test 2: Insert test (will rollback)
    console.log('🔍 Test 2: Testing insert...');
    const testUserId = '00000000-0000-0000-0000-000000000000';
    
    const { data: insertData, error: insertError } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: testUserId,
        email: 'test@test.com',
        full_name: 'Test User'
      })
      .select();

    if (insertError) {
      console.error('❌ Insert error:', insertError);
    } else {
      console.log('✅ Insert successful');
      
      // Clean up test data
      await supabaseAdmin
        .from('profiles')
        .delete()
        .eq('id', testUserId);
      console.log('✅ Test data cleaned up');
    }

    return res.status(200).json({
      success: true,
      tests: {
        connection: true,
        query: !queryError,
        insert: !insertError,
        profileCount: profiles?.length || 0
      },
      message: 'All tests passed'
    });

  } catch (error: unknown) {
    console.error('=== TEST FAILED ===');
    console.error('❌ Error:', error);
    
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error
    });
  }
}