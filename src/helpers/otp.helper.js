import twilio from "twilio";
import { twilioConfig } from "../config/config";

class GenerateOTP {

    static async sendOTP(phone, otp) {
        try {
          const client = new twilio(twilioConfig.accountSid, twilioConfig.authToken);
    
          const message = await client.messages.create({
            body: `Your OTP is: ${otp}`,
            from: twilioConfig.fromPhoneNumber, 
            to: phone 
          });
    
          console.log(`OTP sent to ${phone}: ${message.sid}`);
        } catch (error) {
          console.error("Error sending OTP:", error);
        }
      }
      static isOTPExpired(otpCreatedAt) {
        // Set the expiration time for OTPs in milliseconds (20 minutes)
        const otpExpirationTime = 20 * 60 * 1000; // 20 minutes in milliseconds
        const now = Date.now();
    
        // Check if the OTP has expired
        return now - otpCreatedAt > otpExpirationTime;
      }
    }


export default GenerateOTP;