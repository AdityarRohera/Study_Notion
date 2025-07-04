import { Request , Response } from "express";
import mailSender from "../utils/mailSender";

export const contactUsHandler = async(req : Request , res: Response) => {
    try{

        // fetch data
        const {firstName , lastName , email , phone_no , message} = req.body;

        // validation is pending

        // now send mail to user
        const userMailBody = {
            email : email,
            title : "contact to Study-Notion",
            body : `Dear ${firstName + lastName},
                    Your mail will be answered by the team shortly
                    Thanks For Contacting Us`
        }

        await mailSender(userMailBody);

        // Now send masil to study-Notion with the use details
        const studyNotionMailBody = {
            email : process.env.MAIL_USER!,
            title : "Regarding user query",
            body : `Dear Team,
                    you have a user query regarding,

                    ${message},
                    Please solve as soon as possible.

                    User Details :-
                    FirstName -> ${firstName},
                    LastName -> ${lastName},
                    Email -> ${email},
                    Phone_no. -> ${phone_no}`
        }

        await mailSender(studyNotionMailBody);

        // now send success response
        res.status(200).send({
            success : true,
            message : "Mail send to Study-Notion successfully"
        })

    } catch(err : unknown){
        let errorMessage;
            if(err instanceof Error){
                errorMessage = err.message
            } else if(typeof(err) === 'string'){
                errorMessage = err
            }
            res.status(500).send({
                success : false,
                message : "Error comes while sending mail",
                error : errorMessage
            })
    }
}