import { NextApiRequest, NextApiResponse } from 'next';
import { sendWelcomeEmail } from '@/services/authService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, userName } = req.body;

    if (!email || !userName) {
      return res.status(400).json({ error: 'Email and userName are required' });
    }

    console.log('🧪 Testing welcome email send to:', email);

    const result = await sendWelcomeEmail(email, userName);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: '✅ Welcome email sent successfully!',
        data: result.data
      });
    } else {
      return res.status(500).json({
        success: false,
        message: '❌ Failed to send welcome email',
        error: result.error
      });
    }
  } catch (error: any) {
    console.error('Error in test endpoint:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Unknown error'
    });
  }
}