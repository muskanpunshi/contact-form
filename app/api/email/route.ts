import { verifyCaptchaAction } from '@/utils/recaptcha';
import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from "nodemailer";
import Mail from 'nodemailer/lib/mailer';

export async function POST(request: NextRequest) {
    const { name, email, question, gReCaptchaToken } = await request.json();
    const verify = await verifyCaptchaAction(gReCaptchaToken);
    try {
        if (!verify) {
            return new NextResponse(
                JSON.stringify({
                    message: "recaptcha token is not verified",
                    status: "error",
                }),
                {
                    status: 401,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }


        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.MY_PASSWORD,
            },
        })
        let mailOptions: Mail.Options = {
            from: process.env.MY_EMAIL,
            to: email,
            subject: `Message from ${name}`,
            text: question,
        };

        const sendMailPromise = () =>
            new Promise<string>((resolve, reject) => {
                transport.sendMail(mailOptions, function (err) {
                    if (!err) {
                        resolve('Email sent');
                    } else {
                        reject(err.message);
                    }
                });
            });


        await sendMailPromise();
        return NextResponse.json({ message: 'Email sent successfully' });
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}
