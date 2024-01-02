const config = require('../../config');
const smtpConfig = config.smtp;

const nodemailer = require('nodemailer');

const Utils = require('../utills/utils');
const Status = Utils.Status;

let sendEmail = async (data) => 
{
    try 
    {
        let transportConfig = {
            host: smtpConfig.host,
            port: smtpConfig.port,
            secure: (smtpConfig.secure === 'true' || smtpConfig.secure === true) ? true : false,
            requireTLS: (smtpConfig.requireTls === 'true' || smtpConfig.requireTls === true) ? true : false,
            tls: {
                rejectUnauthorized: false
            },
            auth: {
                user: smtpConfig.email,
                pass: smtpConfig.paswd
            }
        };

        let transporter = nodemailer.createTransport(transportConfig);

        let receipients = {
            from: smtpConfig.sender,
            to: data.email,
            // bcc: smtpConfig.bcc
        }

        let emailContent = {}

        if (data)
        {
            emailContent = {
                subject: data.subject,
                html: data.message
            };
        }
    
        if (data.isHaveFile && data.filepath && data.filepath.path && data.filename)
        {
            emailContent.attachments.push(
                {
                    filename: data.filename,
                    path: data.filepath.path
                }
            );
        }

        if (data.icons)
        {
            for (let index = 0; index < data.icons.length; index ++)
            {
                let icon = data.icons[index];

                if (icon.isEncoded)
                {
                    emailContent.attachments.push({
                        filename: icon.filename,
                        content: icon.content,
                        encoding: 'base64',
                        cid: icon.cid
                    })
                }
                else
                {
                    emailContent.attachments.push(icon);
                }
            }
        }

        await transporter.sendMail({
            ...receipients,
            ...emailContent
        });

        return {
            status: Status.SUCCESS,
            message: "Email sent..."
        }
    }
    catch (error) 
    {
        return {
            status: Status.FAIL,
            message: error.message,
            error: error
        }
    }
};


module.exports = {
    sendEmail: sendEmail,
}