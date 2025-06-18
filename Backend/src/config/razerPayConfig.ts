import Razorpay from 'razorpay';

// now create instance of razerpay
const instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
})

export default instance;