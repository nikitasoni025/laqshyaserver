import dotenv from "dotenv";
import instamojo from "instamojo-nodejs";



const API_KEY='test_386548e0ac7df0a8720cbc55c85';
const AUTH_TOKEN='test_1cf398b906fa83f0504ad21d5f6';

instamojo.setKeys(API_KEY,AUTH_TOKEN);
instamojo.isSandboxMode(true);


dotenv.config();




export const createPaymentIntent = async (req, res) => {

    const { amount,email,phonenumber,fullname} = req.body;

    const data={
        purpose:"Test Payment",
        amount:amount,
        buyer_name:fullname,
        email:email,
        phone:phonenumber,
        send_email:true,
        send_sms:true,
        redirect_url:'http://localhost:8001/paysuccess',
        webhook_url:'http://localhost:8001/webhook',
        allow_repeated_payments:false
    }

    instamojo.createPayment(data,(error,response)=>{
        if(error){
            console.log(error);
        }else{
            const responseData=JSON.parse(response);
            console.log(responseData);
            // res.redirect(responseData);
        }
    });
}

export const paySuccess = async (req, res) => {
    res.send('Payment Successfull');
}

export const webhook =async (req,res)=>{
    const data=req.body;

    if(instamojo.verifyWebhookData(JSON.stringify(data),req.headers['x-instamojo-signature'])){
        console.log('Payment Done');
        res.status(200).json({msg:"Payment Done"})
    }else{
        console.log('Payment Not Verified');
        res.status(400).json({msg:"Payment Not Verified"});

    }

}