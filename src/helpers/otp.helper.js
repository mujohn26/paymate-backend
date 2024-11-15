import twilio from "twilio";
import { twilioConfig } from "../config/config";

class GenerateOTP {

    static async sendOTP(phone, otp) {
        try {
          const client = new twilio(twilioConfig.accountSid, twilioConfig.authToken);
    
          const message = await client.messages.create({
            body: `Your OTP is: ${otp}`,
            from: twilioConfig.fromPhoneNumber, 
            to: "+250785571790" 
          });
    
          console.log(`OTP sent to ${phone}: ${message.sid}`);
        } catch (error) {
          console.error("Error sending OTP:", error);
        }
      }
      static isOTPExpired(otpCreatedAt) {
        
        const otpExpirationTime = 20 * 60 * 1000;
        const now = Date.now();
    
        
        return now - otpCreatedAt > otpExpirationTime;
      }
    }


export default GenerateOTP;