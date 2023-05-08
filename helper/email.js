var nodemailer = require('nodemailer');
function sendMailFunction(type, name, toEmail) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'astrosaggaofficial@gmail.com',
            pass: 'bmmsraoltitlmooe'
        }
    });

    var emailHtml = ''
    var subject = ''
    if (type == 'Register') {
        emailHtml = `<h3>Hi ${name}</h3> 
            <h5> You are registered Successfully with Astrosagga.</h5>
            <p>Thank you for connecting us.</p>
            <p>Astrosagga</p>
            <p>astrosagga@gmail.com</p>
            <p>987-XXX-XXXX</p>`;
        subject = 'Registration Successfully'
    }
    if (type == 'ChangePassword') {
        emailHtml = `<h3>Hi ${name}</h3> 
            <h5> You are Successfully Changed your passsword.</h5>
            <p>Thank you</p>
            <p>Astrosagga</p>
            <p>astrosagga@gmail.com</p>
            <p>987-XXX-XXXX</p>`;
        subject = 'Change Password'
    }
    if (type == 'PurchasedCourse') {
        emailHtml = `<h3>Hi ${name}</h3> 
            <h5> You are Successfully Purchased a Course.</h5>
            <h5> Login into your account and checkout all the lesson of the course.</h5>
            <p>Thank you</p>
            <p>Astrosagga</p>
            <p>astrosagga@gmail.com</p>
            <p>987-XXX-XXXX</p>`;
        subject = 'Course Purchase'
    }

    if (type == 'NewPost') {
        emailHtml = `<div role="region" tabindex="-1" aria-label="Message body" class="">
        <div>
            <style type="text/css">
                .rps_26bb #x_outlook a {
                    padding: 0
                }
    
                .rps_26bb>div {
                    margin: 0;
                    padding: 0
                }
    
                .rps_26bb table,
                .rps_26bb td {
                    border-collapse: collapse
                }
    
                .rps_26bb img {
                    border: 0;
                    height: auto;
                    line-height: 100%;
                    outline: none;
                    text-decoration: none
                }
    
                .rps_26bb p {
                    display: block;
                    margin: 13px 0
                }
            </style>
            <style type="text/css">
    
    
            </style>
            <style type="text/css">
                @media only screen and (min-width:480px) {
                    .rps_26bb .x_mj-column-per-100 {
                        width: 100% !important;
                        max-width: 100%
                    }
    
                }
            </style>
            <style media="screen and (min-width:480px)">
                .rps_26bb .x_moz-text-html .x_mj-column-per-100 {
                    width: 100% !important;
                    max-width: 100%
                }
            </style>
            <style type="text/css">
                @media only screen and (max-width:480px) {
                    .rps_26bb table.x_mj-full-width-mobile {
                        width: 100% !important
                    }
    
                    .rps_26bb td.x_mj-full-width-mobile {
                        width: auto !important
                    }
    
                }
            </style>
            <style type="text/css">
                .rps_26bb .x_mj-purple-text {
                    color: #3762DD !important
                }
    
                .rps_26bb .x_table-section {
                    padding: 0 !important
                }
    
                .rps_26bb .x_know-more div {
                    padding: 0 10px
                }
    
                .rps_26bb .x_table-col {
                    border-radius: 8px;
                    border: 2px solid #E8EEFF;
                    overflow: hidden;
                    border-collapse: collapse
                }
    
                .rps_26bb .x_td-left {
                    font-size: 14px;
                    color: #98A2B3;
                    width: 50%;
                    padding-bottom: 8px
                }
    
                .rps_26bb .x_td-right {
                    font-size: 14px;
                    color: #667085;
                    font-weight: 700;
                    padding-bottom: 8px
                }
    
                .rps_26bb .x_ab-section {
                    padding: 0 16px
                }
    
                .rps_26bb .x_ab-section .x_ab-col {
                    border-radius: 8px;
                    overflow: hidden
                }
    
                .rps_26bb .x_ab-section .x_ab-col .x_ab-title div {
                    font-size: 14px;
                    font-weight: bold;
                    padding: 13px 28px
                }
    
                .rps_26bb .x_ab-table>table {
                    border-collapse: separate;
                    border-spacing: 0 10px
                }
    
                .rps_26bb .x_footer {
                    padding: 0 16px
                }
    
                .rps_26bb .x_footer-col {
                    border-radius: 8px;
                    overflow: hidden
                }
    
                .rps_26bb .x_footer .x_footer-text div {
                    font-size: 12px;
                    padding: 0 32px
                }
    
                .rps_26bb .x_header-text div {
                    padding: 0 16px;
                    font-size: 18px !important;
                    color: #344054 !important;
                    font-weight: bold
                }
    
                .rps_26bb .x_subheader-text div {
                    font-size: 14px;
                    padding: 0 32px
                }
    
                @media (min-width:480px) {
                    .rps_26bb .x_header-text div {
                        padding: 0 64px !important;
                        font-size: 32px !important;
                        line-height: 54px !important
                    }
    
                    .rps_26bb .x_subheader-text div {
                        padding: 0 96px !important;
                        font-size: 16px !important
                    }
    
                    .rps_26bb .x_table-section .x_table-col {
                        padding: 20px 25px !important
                    }
    
                    .rps_26bb .x_table-section .x_table-col .x_table-col-text div {
                        font-size: 18px !important
                    }
    
                    .rps_26bb .x_td-left {
                        font-size: 16px !important;
                        padding-bottom: 16px !important
                    }
    
                    .rps_26bb .x_td-right {
                        font-size: 16px !important;
                        padding-bottom: 16px !important
                    }
    
                    .rps_26bb .x_know-more div {
                        padding: 0 80px !important;
                        font-size: 16px !important
                    }
    
                    .rps_26bb .x_footer {
                        padding: 0 !important
                    }
    
                    .rps_26bb .x_footer .x_footer-col .x_footer-text div {
                        font-size: 14px !important;
                        padding: 0 108px !important
                    }
    
                    .rps_26bb .x_ab-table .x_ab-td-logo {
                        padding: 14px 28px !important
                    }
    
                    .rps_26bb .x_ab-section .x_ab-col .x_ab-title div {
                        font-size: 16px !important;
                        padding: 24px 124px !important
                    }
    
                    .rps_26bb .x_ab-table {
                        padding: 0 48px !important
                    }
    
                    .rps_26bb .x_ab-table table {
                        border-spacing: 0 18px !important
                    }
    
                    .rps_26bb .x_ab-table .x_ab-td-data {
                        padding: 22px 20px !important
                    }
    
                    .rps_26bb .x_ab-table .x_ab-td-data p {
                        font-size: 14px !important
                    }
    
                }
            </style>
            <div class="rps_26bb">
                <div style="word-spacing:normal; background-color:#EEEBE6">
                    <div style="background-color:#fff">
    
                        <div style="background-color:#EEEBE6;width: 600px;margin: 0px auto;">
                            <div style="background:#EEEBE6; background-color:#EEEBE6; margin:0px auto; max-width:600px">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                    style="background:#EEEBE6; background-color:#EEEBE6; width:100%">
                                    <tbody>
                                        <tr>
                                            <td style="direction:ltr; font-size:0px; padding:0px; text-align:center">
                                                <div class="x_mj-column-per-100 x_mj-outlook-group-fix"
                                                    style="font-size:0px; text-align:left; direction:ltr; display:inline-block; vertical-align:top; width:100%">
                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                                        width="100%" style="background-color:#EEEBE6; vertical-align:top">
                                                        <tbody>
                                                            <tr>
                                                                <td align="center"
                                                                    style="font-size:0px; padding:10px 25px; padding-top:40px; word-break:break-word">
                                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                                        role="presentation"
                                                                        style="border-collapse:collapse; border-spacing:0px">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td style="width:150px">
                                                                                <a  target='_blank' href="https://astrosagga.com">
                                                                                    <img
                                                                                        data-imagetype="External"
                                                                                        src="https://www.astrosagga.com/assets/images/logo.png"
                                                                                        alt="Logo" height="auto" width="150"
                                                                                        style="border:0; display:block; outline:none; text-decoration:none; height:auto; width:100%; font-size:13px">
                                                                                </a>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
    
    
    
                            <div
                                style="background:#EEEBE6; background-color:#EEEBE6; margin-top:20px auto; max-width:620px">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                    style="background:#EEEBE6; background-color:#EEEBE6; width:100%">
                                    <tbody>
                                        <tr>
                                            <td style="direction:ltr; font-size:0px; padding:0px; text-align:center">
                                                <div class="x_mj-column-per-100 x_mj-outlook-group-fix"
                                                    style="font-size:0px; text-align:left; direction:ltr; display:inline-block; vertical-align:top; width:100%">
                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                                        width="100%" style="background-color:#EEEBE6; vertical-align:top">
                                                        <tbody>
                                                            <tr>
                                                                <td align="center" class="x_header-text"
                                                                    style="font-size:0px; padding:0px; word-break:break-word">
                                                                    <div
                                                                        style="font-family: Arial, sans-serif, serif, EmojiFont; font-size: 14px; line-height: 24px; text-align: center; color: black !important;">
                                                                        Hi
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
    
    
                            <div style="background:#EEEBE6; background-color:#EEEBE6; margin:0px auto; max-width:600px">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                    style="background:#EEEBE6; background-color:#EEEBE6; width:100%">
                                    <tbody>
                                        <tr>
                                            <td style="direction:ltr; font-size:0px; padding:0px; text-align:center">
                                                <div class="x_mj-column-per-100 x_mj-outlook-group-fix"
                                                    style="font-size:0px; text-align:left; direction:ltr; display:inline-block; vertical-align:top; width:100%">
                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                                        width="100%" style="background-color:#EEEBE6; vertical-align:top">
                                                        <tbody>
                                                            <tr>
                                                                <td style="font-size:0px; word-break:break-word">
                                                                    <div style="height:16px; line-height:16px"> </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center" class="x_subheader-text"
                                                                    style="font-size:0px; padding:0px; word-break:break-word">
                                                                    <div
                                                                        style="font-family: Arial, sans-serif, serif, EmojiFont; font-size: 14px; line-height: 24px; text-align: center; color: #000000;">
                                                                        <b>ASTROSAGGA </b> is added a new post name is 
                                                                        <br> <b>"${name.split('|')[0]}"</b>
                                                                        <br>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
    
                            <div style="background:#EEEBE6; background-color:#EEEBE6; margin:0px auto; max-width:600px">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                    style="background:#EEEBE6; background-color:#EEEBE6; width:100%">
                                    <tbody>
                                        <tr>
                                            <td style="direction:ltr; font-size:0px; padding:0px; text-align:center">
                                                <div class="x_mj-column-per-100 x_mj-outlook-group-fix"
                                                    style="font-size:0px; text-align:left; direction:ltr; display:inline-block; vertical-align:top; width:100%">
                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                                        width="100%" style="background-color:#EEEBE6; vertical-align:top">
                                                        <tbody>
                                                            <tr>
                                                                <td style="font-size:0px; word-break:break-word">
                                                                    <div style="height:24px; line-height:24px"> </div>
                                                                </td>
                                                            </tr>
    
                                                            <tr>
                                                                <td align="center"
                                                                    style="font-size:0px; padding:10px 25px; word-break:break-word">
                                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                                        role="presentation"
                                                                        style="border-collapse:separate; width:119px; line-height:100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="center" bgcolor="#3762DD"
                                                                                    role="presentation" valign="middle"
                                                                                    style="border:none; border-radius:3px; height:40px; background:#dd5d37">
                                                                                    <a href="https://www.astrosagga.com/#/blogDetail/${name.split('|')[1]}"
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                        data-auth="NotApplicable"
                                                                                        style="display:inline-block; width:119px; background:#dd5d37; color:#F5F8FA; font-family:Arial; font-size:14px; font-weight:normal; line-height:120%; margin:0; text-decoration:none; text-transform:none; padding:0; border-radius:3px"
                                                                                        data-linkindex="1">Click To View
                                                                                    </a>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="font-size:0px; word-break:break-word">
                                                                    <div style="height:18px; line-height:18px"> </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
    
    
                            <div style="background:#EEEBE6; background-color:#EEEBE6; margin:0px auto; max-width:600px">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                    style="background:#EEEBE6; background-color:#EEEBE6; width:100%">
                                    <tbody>
                                        <tr>
                                            <td style="direction:ltr; font-size:0px; padding:0px; text-align:center">
                                                <div class="x_mj-column-per-100 x_mj-outlook-group-fix"
                                                    style="font-size:0px; text-align:left; direction:ltr; display:inline-block; vertical-align:top; width:100%">
                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                                        width="100%" style="background-color:#EEEBE6; vertical-align:top">
                                                        <tbody>
    
                                                            <tr>
                                                                <td align="center" class="x_subheader-text"
                                                                    style="font-size:0px; padding:0px; word-break:break-word">
                                                                    <div
                                                                        style="font-family: Arial, sans-serif, serif, EmojiFont; font-size: 14px; line-height: 24px; text-align: center; color: #8bc34a;">
                                                                        Thanks for Subscribe @Astrosagga
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="font-size:0px; word-break:break-word">
                                                                    <div style="height:24px; line-height:24px"> </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="font-size:0px; word-break:break-word">
                                                                    <div style="height:24px; line-height:24px"> </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
    
                        </div>
    
                        <div
                            style="background:#fff; background-color:#fff; margin:0px auto; max-width:600px;border-top: 1px solid #ccc;">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                style="background:#fff; background-color:#fff; width:100%">
                                <tbody>
                                    <tr>
                                        <td style="direction:ltr; font-size:0px; padding:0px; text-align:center">
                                            <div class="x_mj-column-per-100 x_mj-outlook-group-fix"
                                                style="font-size:0px; text-align:left; direction:ltr; display:inline-block; vertical-align:top; width:100%;">
                                                <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                                    width="100%" style="background-color:#eeebe6; vertical-align:top">
                                                    <tbody>
                                                        <tr>
                                                            <td style="font-size:0px; word-break:break-word">
                                                                <div style="height:16px; line-height:16px"> </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="center" class="x_subheader-text"
                                                                style="font-size:0px; padding:0px; word-break:break-word">
                                                                <div
                                                                    style="font-family: Arial, sans-serif, serif, EmojiFont; font-size: 14px; line-height: 24px; text-align: center; color: rgb(102, 112, 133);display: inline-flex;">
    
                                                                    <a target='_blank' href="https://www.facebook.com/Astrosagga-116060738050927">
                                                                    <img data-imagetype="External"
                                                                        src="https://astrosagga.com/assets/social%20media/fb.png"
                                                                        alt="Logo" height="auto" width="100px"
                                                                        style="padding: 15px;border:0; display:block; outline:none; text-decoration:none; height:auto; width:30px; font-size:13px">
                                                                    </a>
    
                                                                    <a target='_blank' href="https://instagram.com/astrosagga?igshid=MDM4ZDc5MmU=">
                                                                    <img data-imagetype="External"
                                                                        src="https://astrosagga.com/assets/social%20media/insta.png"
                                                                        alt="Logo" height="auto" width="100px"
                                                                        style="padding: 15px;border:0; display:block; outline:none; text-decoration:none; height:auto; width:30px; font-size:13px">
                                                                    </a>
    
    
                                                                    <a target='_blank' href="https://www.youtube.com/channel/UCQWbzHC1OZa1iZGKy1tSDkA">
                                                                    <img data-imagetype="External"
                                                                        src="https://astrosagga.com/assets/social%20media/youtube.png"
                                                                        alt="Logo" height="auto" width="100px"
                                                                        style="padding: 15px;border:0; display:block; outline:none; text-decoration:none; height:auto; width:30px; font-size:13px">
                                                                    </a>
    
                                                                    <a target='_blank' href="https://www.telegram.com/">
                                                                    <img data-imagetype="External"
                                                                        src="https://astrosagga.com/assets/social%20media/telegram.png"
                                                                        alt="Logo" height="auto" width="100px"
                                                                        style="padding: 15px;border:0; display:block; outline:none; text-decoration:none; height:auto; width:30px; font-size:13px">
                                                                    </a>
    
                                                                    <a target='_blank' href="https://www.twitter.com/">
                                                                    <img data-imagetype="External"
                                                                        src="https://astrosagga.com/assets/social%20media/tweet.png"
                                                                        alt="Logo" height="auto" width="100px"
                                                                        style="padding: 15px;border:0; display:block; outline:none; text-decoration:none; height:auto; width:30px; font-size:13px">
                                                                    </a>
    
    
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
    
    
    
    
    
                    </div>
                </div>
            </div>
        </div>
    </div>`;
        subject = 'New Post Added'
    }

    var mailOptions = {
        from: 'astrosaggaofficial@gmail.com',
        to: toEmail,
        subject: subject,
        html: emailHtml
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return (error);
        } else {
            return (info.response);
        }
    });
}
module.exports = {
    sendMailFunction
}