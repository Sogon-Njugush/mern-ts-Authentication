export const verifyEmailTemplate = (
  url: string,
  brandColor: string = "#2563EB"
) => ({
  subject: "✨ Confirm your Squeezy account",
  text: `Please verify your email address by clicking the following link: ${url}`,
  html: `
    <html><head>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
      
      body, html { 
        margin: 0; 
        padding: 0; 
        font-family: 'Poppins', Arial, sans-serif; 
        background-color: #f8fafc; 
        color: #334155; 
      }
      
      .container { 
        max-width: 600px; 
        margin: 20px auto; 
        background-color: #ffffff; 
        border-radius: 12px; 
        box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.08); 
        overflow: hidden;
        border: 1px solid #e2e8f0;
      }
      
      .header { 
        background: linear-gradient(135deg, ${brandColor} 0%, ${adjustBrightness(brandColor, -20)} 100%);
        padding: 30px; 
        text-align: center; 
        position: relative;
      }
      
      .header:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.3) 100%);
      }
      
      .logo {
        font-size: 28px;
        font-weight: 600;
        color: white;
        letter-spacing: 1px;
        text-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      
      .content { 
        padding: 30px; 
        text-align: center; 
      }
      
      .content h1 { 
        font-size: 24px; 
        font-weight: 600;
        color: #1e293b; 
        margin-bottom: 15px;
      }
      
      .content p { 
        font-size: 16px; 
        color: #64748b; 
        margin: 15px 0; 
        line-height: 1.6;
      }
      
      .button-container {
        margin: 30px 0;
      }
      
      .button { 
        display: inline-block; 
        padding: 16px 32px; 
        font-size: 16px; 
        font-weight: 500; 
        background: linear-gradient(135deg, ${brandColor} 0%, ${adjustBrightness(brandColor, -10)} 100%);
        color: #fff !important; 
        border-radius: 8px; 
        text-decoration: none; 
        box-shadow: 0 4px 12px ${transparentize(brandColor, 0.7)};
        transition: all 0.3s ease;
        border: none;
        cursor: pointer;
      }
      
      .button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px ${transparentize(brandColor, 0.6)};
      }
      
      .footer { 
        font-size: 14px; 
        color: #94a3b8; 
        text-align: center; 
        padding: 20px 30px; 
        background-color: #f8fafc;
        border-top: 1px solid #e2e8f0;
      }
      
      .footer p {
        margin: 5px 0;
      }
      
      .divider {
        height: 1px;
        background-color: #e2e8f0;
        margin: 20px 0;
      }
      
      .small-text {
        font-size: 13px;
        color: #94a3b8;
        margin-top: 25px;
      }
      
      @media only screen and (max-width: 600px) {
        .container {
          margin: 10px;
          border-radius: 8px;
        }
      }
    </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Squeezy</div>
        </div>
        
        <div class="content">
          <h1>Confirm Your Email Address</h1>
          <p>Welcome to Squeezy! We're excited to have you on board. To get started, please verify your email address by clicking the button below.</p>
          
          <div class="button-container">
            <a href="${url}" class="button">Verify Email Address</a>
          </div>
          
          <p>This link will expire in 24 hours. If you didn't request this, please ignore this email.</p>
          
          <div class="divider"></div>
          
          <p class="small-text">If the button above doesn't work, copy and paste this link into your browser:</p>
          <p class="small-text" style="word-break: break-all;">${url}</p>
        </div>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} Squeezy. All rights reserved.</p>
          <p>If you have any questions, reply to this email or contact our support team.</p>
        </div>
      </div>
    </body></html>
  `,
});

export const passwordResetTemplate = (
  url: string,
  brandColor: string = "#2563EB"
) => ({
  subject: "🔑 Reset Your Squeezy Password",
  text: `To reset your password, please click the following link: ${url}`,
  html: `
    <html><head>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
      
      body, html { 
        margin: 0; 
        padding: 0; 
        font-family: 'Poppins', Arial, sans-serif; 
        background-color: #f8fafc; 
        color: #334155; 
      }
      
      .container { 
        max-width: 600px; 
        margin: 20px auto; 
        background-color: #ffffff; 
        border-radius: 12px; 
        box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.08); 
        overflow: hidden;
        border: 1px solid #e2e8f0;
      }
      
      .header { 
        background: linear-gradient(135deg, ${brandColor} 0%, ${adjustBrightness(brandColor, -20)} 100%);
        padding: 30px; 
        text-align: center; 
        position: relative;
      }
      
      .header:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.3) 100%);
      }
      
      .logo {
        font-size: 28px;
        font-weight: 600;
        color: white;
        letter-spacing: 1px;
        text-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      
      .content { 
        padding: 30px; 
        text-align: center; 
      }
      
      .content h1 { 
        font-size: 24px; 
        font-weight: 600;
        color: #1e293b; 
        margin-bottom: 15px;
      }
      
      .content p { 
        font-size: 16px; 
        color: #64748b; 
        margin: 15px 0; 
        line-height: 1.6;
      }
      
      .button-container {
        margin: 30px 0;
      }
      
      .button { 
        display: inline-block; 
        padding: 16px 32px; 
        font-size: 16px; 
        font-weight: 500; 
        background: linear-gradient(135deg, ${brandColor} 0%, ${adjustBrightness(brandColor, -10)} 100%);
        color: #fff !important; 
        border-radius: 8px; 
        text-decoration: none; 
        box-shadow: 0 4px 12px ${transparentize(brandColor, 0.7)};
        transition: all 0.3s ease;
        border: none;
        cursor: pointer;
      }
      
      .button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px ${transparentize(brandColor, 0.6)};
      }
      
      .footer { 
        font-size: 14px; 
        color: #94a3b8; 
        text-align: center; 
        padding: 20px 30px; 
        background-color: #f8fafc;
        border-top: 1px solid #e2e8f0;
      }
      
      .footer p {
        margin: 5px 0;
      }
      
      .divider {
        height: 1px;
        background-color: #e2e8f0;
        margin: 20px 0;
      }
      
      .small-text {
        font-size: 13px;
        color: #94a3b8;
        margin-top: 25px;
      }
      
      @media only screen and (max-width: 600px) {
        .container {
          margin: 10px;
          border-radius: 8px;
        }
      }
    </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Squeezy</div>
        </div>
        
        <div class="content">
          <h1>Reset Your Password</h1>
          <p>We received a request to reset your Squeezy account password. Click the button below to set a new password.</p>
          
          <div class="button-container">
            <a href="${url}" class="button">Reset Password</a>
          </div>
          
          <p>This link will expire in 24 hours. If you didn't request a password reset, please ignore this email.</p>
          
          <div class="divider"></div>
          
          <p class="small-text">If the button above doesn't work, copy and paste this link into your browser:</p>
          <p class="small-text" style="word-break: break-all;">${url}</p>
        </div>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} Squeezy. All rights reserved.</p>
          <p>If you have any questions, reply to this email or contact our support team.</p>
        </div>
      </div>
    </body></html>
  `,
});

// Helper functions (you'll need to implement these)
function adjustBrightness(color: string, percent: number): string {
  // Implement this function to adjust color brightness
  return color; // Placeholder
}

function transparentize(color: string, opacity: number): string {
  // Implement this function to add transparency to a color
  return color; // Placeholder
}
