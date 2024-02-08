const config = require('../../config');

let generateUserInvitation = (data) =>
{
    let signInUrl = config.app_urls.userSiginInUrl + `/api/update/invite/user/${data.id}`;

    return `
        <div style="width: 100% !important; height: 100%;  background: #ffffff;font-size: 16px;">
            <div style="display: block !important; clear: both !important; margin: 0 auto !important; max-width: 700px !important; font-size: 13px; color: #2F2D46">    

                <div style="padding: 40px;font-family:'Open Sans';font-weight:500;color:#2F2D46;font-size:16px;line-height:24px !important;">
                   
                    <div style="margin-top: 10px;">
                        Hi ${data.name},
                    </div>

                    <div style="margin-top: 20px;">
                        We are inviting you to SaiKotiOnline.
                    </div>

                    <div style="margin-top: 20px;">
                        Sign up with this email address to start today. Please click on the below link to activate your account.
                    </div>

                    <div class="container" style="width: 100%;margin-top: 30px;display: block;position: relative;text-align: center;">
                        <a style="text-decoration: none; cursor: pointer;border-radius: 25px;text-decoration: none;cursor: pointer;padding: 8px 25px;font-weight: 500;background-color: #ED8B00;color:white;" href="`+ signInUrl +`">
                            CLICK HERE
                        </a>
                    </div>

                    <div style="margin-top: 20px; font-size: 16px; color:#2F2D46;">
                       Regards,
                       <br>
                      xxxxxxxx
                    </div>	

                    <hr style="margin-top: 40px; border-top: 1px solid #D5D1D1;">
                    
                    <div style="font-size: 12px; color:#6D6C7D;font-weight: 500;line-height:14px !important;text-align: justify;">  
                
                    <div style="margin-top: 10px;">
                        This is an automated message. Please do not reply directly to this email as you will not receive a response. If you have any system related questions or technical issues, please contact us at <a style="color: #6B63A1; text-decoration: underline;" href="mailto:story.support@jpmorgan.com"> XXXXX</a>.
                    </div>
                
                    <div style="margin-top:10px;">
                        &copy; ${new Date().getFullYear()} SAIKOTIONLINE. All rights reserved.
                    </div>
                </div>
            </div>
        </div>`;
}

let generateResetPassword = (data) =>
{
    let signInUrl = config.app_urls.userSiginInUrl + `/change-password`;

    return `
        <div style="width: 100% !important; height: 100%;  background: #ffffff;font-size: 16px;">
            <div style="display: block !important; clear: both !important; margin: 0 auto !important; max-width: 700px !important; font-size: 13px; color: #2F2D46">    

                <div style="padding: 40px;font-family:'Open Sans';font-weight:500;color:#2F2D46;font-size:16px;line-height:24px !important;">
                   
                    <div style="margin-top: 10px;">
                        Hi ${data.name},
                    </div>

                    <div style="margin-top: 20px;">
                        Follow the link below to reset your password:
                    </div>

                    <div class="container" style="width: 100%;margin-top: 30px;display: block;position: relative;text-align: center;">
                        <a style="text-decoration: none; cursor: pointer;border-radius: 25px;text-decoration: none;cursor: pointer;padding: 8px 25px;font-weight: 500;background-color: #ED8B00;color:white;" href="`+ signInUrl +`">
                            CLICK HERE
                        </a>
                    </div>

                    <div style="margin-top: 20px; font-size: 16px; color:#2F2D46;">
                       Regards,
                       <br>
                      xxxxxxxx
                    </div>	

                    <hr style="margin-top: 40px; border-top: 1px solid #D5D1D1;">
                    
                    <div style="font-size: 12px; color:#6D6C7D;font-weight: 500;line-height:14px !important;text-align: justify;">  
                
                    <div style="margin-top: 10px;">
                        This is an automated message. Please do not reply directly to this email as you will not receive a response. If you have any system related questions or technical issues, please contact us at <a style="color: #6B63A1; text-decoration: underline;" href="mailto:story.support@jpmorgan.com"> XXXXX</a>.
                    </div>
                
                    <div style="margin-top:10px;">
                        &copy; ${new Date().getFullYear()} SAIKOTIONLINE. All rights reserved.
                    </div>
                </div>
            </div>
        </div>`;
}

let generateContactUs = (data) =>
{
    return `
        <div style="width: 100% !important; height: 100%;  background: #ffffff;font-size: 16px;">
            <div style="display: block !important; clear: both !important; margin: 0 auto !important; max-width: 700px !important; font-size: 13px; color: #2F2D46">    

                <div style="padding: 40px;font-family:'Open Sans';font-weight:500;color:#2F2D46;font-size:16px;line-height:24px !important;">
                   
                    <div style="margin-top: 10px;">
                        Dear Support Team,
                    </div>

                    <div style="margin-top: 20px;">
                        A new message has been submitted via the contact form. Below are the details:
                    </div>

                    <div style="margin-top: 20px;">
                        <ul style="list-style-type: none; padding: 0;">
                            <li><strong>Name:</strong> ${data.name}</li>
                            <li><strong>Email:</strong> ${data.email}</li>
                            <li><strong>Message:</strong> ${data.message}</li>
                        </ul>
                    </div>

                    <div style="margin-top: 20px;">
                        <p>Please take the following actions:</p>
                        <ol>
                            <li>Review the user's message carefully to understand their inquiry or concern.</li>
                            <li>Ensure that the user's query is logged in our system for tracking purposes.</li>
                            <li>If the message requires a response, draft a timely and informative reply addressing the user's needs or concerns.</li>
                            <li>If the inquiry is beyond the scope of support, escalate it to the appropriate department or individual within the company.</li>
                        </ol>
                    </div>

                    <div style="margin-top: 20px;">
                        It's crucial to maintain professionalism and provide excellent customer service. If you have any questions or need assistance, please do not hesitate to reach out to customer.
                    </div>

                    <hr style="margin-top: 40px; border-top: 1px solid #D5D1D1;">
                    
                    <div style="font-size: 12px; color:#6D6C7D;font-weight: 500;line-height:14px !important;text-align: justify;">  
                
                    <div style="margin-top: 10px;">
                        This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you have received this email in error, please notify the system manager. Please note that any views or opinions presented in this email are solely those of the author and do not necessarily represent those of the company. Finally, the recipient should check this email and any attachments for the presence of viruses. The company accepts no liability for any damage caused by any virus transmitted by this email.
                    </div>
                
                    <div style="margin-top:10px;">
                        &copy; ${new Date().getFullYear()} SAIKOTIONLINE. All rights reserved.
                    </div>
                </div>
            </div>
        </div>`;
}

module.exports = {
    generateUserInvitation: generateUserInvitation,
    generateResetPassword: generateResetPassword,
    generateContactUs: generateContactUs
}