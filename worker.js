export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { 
        status: 405,
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      });
    }

    try {
      const data = await request.json();
      
      // Validate required fields
      if (!data.name || !data.email || !data.message || !data.recaptcha_token) {
        return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        });
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        return new Response(JSON.stringify({ success: false, error: 'Invalid email format' }), { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        });
      }

      // Verify reCAPTCHA token
      const recaptchaSecretKey = env.RECAPTCHA_SECRET_KEY;
      if (!recaptchaSecretKey) {
        return new Response(JSON.stringify({ success: false, error: 'Server configuration error' }), { 
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        });
      }

      const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${recaptchaSecretKey}&response=${data.recaptcha_token}&remoteip=${request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || 'unknown'}`
      });

      const recaptchaResult = await recaptchaResponse.json();

      if (!recaptchaResult.success || recaptchaResult.score < 0.5) {
        return new Response(JSON.stringify({ success: false, error: 'reCAPTCHA verification failed' }), { 
          status: 403,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        });
      }

      const telegramBotToken = env.TELEGRAM_BOT_TOKEN;
      const telegramChatId = env.TELEGRAM_CHAT_ID;

      if (!telegramBotToken || !telegramChatId) {
        return new Response(JSON.stringify({ success: false, error: 'Server configuration error' }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        });
      }

      const telegramUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

      const telegramMessage = `<b>New Contact Form Submission</b>

<b>Name:</b> ${data.name}
<b>Email:</b> ${data.email}
<b>Message:</b>
<pre>${data.message}</pre>`;

      const response = await fetch(telegramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: telegramMessage,
          parse_mode: 'HTML'
        })
      });

      const telegramResult = await response.json();

      if (telegramResult.ok) {
        return new Response(JSON.stringify({ success: true, message: 'Message sent to Telegram successfully' }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        });
      } else {
        console.error('Telegram error:', telegramResult);
        return new Response(JSON.stringify({ success: false, error: 'Failed to send message to Telegram' }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        });
      }
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(JSON.stringify({ success: false, error: 'Internal server error' }), { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    }
  }
};