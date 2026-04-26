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

      const mailgunApiKey = env.MAILGUN_API_KEY;
      const domain = env.MAILGUN_DOMAIN;
      const recipientEmail = env.RECIPIENT_EMAIL || 'phamquocbuu@gmail.com';

      if (!mailgunApiKey || !domain) {
        return new Response(JSON.stringify({ success: false, error: 'Server configuration error' }), { 
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        });
      }

      const mailgunUrl = `https://api.mailgun.net/v3/${domain}/messages`;

      const params = new URLSearchParams();
      params.append('from', `Contact Form <noreply@${domain}>`);
      params.append('to', recipientEmail);
      params.append('reply-to', data.email);
      params.append('subject', `New Contact Form Submission from ${data.name}`);
      
      // Create HTML email content
      const htmlContent = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #8b5cf6; margin: 10px 0;">
          ${data.message.replace(/\n/g, '<br>')}
        </div>
        <hr>
        <p style="color: #666; font-size: 12px;">This email was sent from your portfolio contact form.</p>
      `;
      
      params.append('html', htmlContent);
      params.append('text', `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`);

      const response = await fetch(mailgunUrl, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`api:${mailgunApiKey}`),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
      });

      if (response.ok) {
        return new Response(JSON.stringify({ success: true, message: 'Email sent successfully' }), { 
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        });
      } else {
        const errorText = await response.text();
        console.error('Mailgun error:', errorText);
        return new Response(JSON.stringify({ success: false, error: 'Failed to send email' }), { 
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