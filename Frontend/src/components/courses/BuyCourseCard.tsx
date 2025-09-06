
import { useRazorpay, type RazorpayOrderOptions } from "react-razorpay";
import { BASE_URL } from "../../Services/apiConfig";
import { PAYMENT_API_ENDPOINT } from "../../Services/apiConfig";
import { apiConnector } from "../../Services/apiConnector";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { useSelector } from "react-redux";
// import type { RootState } from "../../Services/strore";


function BuyCourseCard({id , amount ,courseName} : any) {
  console.log(courseName);
  const navigate = useNavigate();

  const {Razorpay } = useRazorpay();
  const [loading, setLoading] = useState(false); // 🔑 local loading


  // const handlePayment = async() => {

  //   const storedUser = localStorage.getItem("user");

  //   if (!storedUser) {
  //     navigate('/login');
  //     return;
  //   }

  //   const user = JSON.parse(storedUser);
  //   const {firstName , lastName , email , contact_no} : any = user;
  //   console.log("About user" , firstName , lastName , email , contact_no);

  //   try{
  //     // create order id
  //     const orderResponse = await apiConnector({
  //       method : 'POST',
  //       url : `${BASE_URL}${PAYMENT_API_ENDPOINT.CREATE_ORDER}`,
  //       bodyData : {courseId : id ,amount , currency : 'INR'},
  //       headers : {token : `${localStorage.getItem('token')}`}
  //     })

  //     console.log(orderResponse);

  //     if(orderResponse.data){
        
  //       const options: RazorpayOrderOptions = {
  //         key: "rzp_test_HGacuFpexD8oZ4",
  //         amount: amount*100, // Amount in paise
  //         currency: "INR",
  //         name: "Study-Notion",
  //         description: courseName || "Course Purchase",
  //         order_id: `${orderResponse.data.razorpayOrderId}`, // Generate order_id on server

  //         // handler: async(response) => {
  //         //   console.log(response);

  //         //   const {razorpay_payment_id ,razorpay_signature} = response;
  //         //   const razorpay_order_id = orderResponse.data.razorpayOrderId;

  //         //   // now verify payment process
  //         //   const verifyPaymentRes =await apiConnector({
  //         //     method : 'POST',
  //         //     url : `${BASE_URL}${PAYMENT_API_ENDPOINT.VERIFY_PAYMENT}`,
  //         //     bodyData : {courseId : id , razorpay_order_id , razorpay_payment_id , razorpay_signature , email : "adityarohera0407@gmail.com"},
  //         //     headers : {token : `${localStorage.getItem('token')}`}
  //         //   })

  //         //   if(verifyPaymentRes){
  //         //     console.log(verifyPaymentRes);
  //         //      alert("Payment Successful!");
  //         //   }
  
  //         // },

  //         prefill: {
  //           name: firstName + " " + lastName,
  //           email: email,
  //           contact: contact_no,
  //         },

  //         theme: {  
  //           color: "#F37254",
  //         },
  //       };

  //       const razorpayInstance = new Razorpay(options);
  //       razorpayInstance.open();
  //     }

  //   }catch(err){
  //     console.log(err);
  //   }
  // }

  const handlePayment = async () => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(storedUser);
    const { firstName, lastName, email, contact_no }: any = user;
    console.log("About user", firstName, lastName, email, contact_no);

    try {
      setLoading(true); // start loading 🔥

      // create order id
      const orderResponse = await apiConnector({
        method: "POST",
        url: `${BASE_URL}${PAYMENT_API_ENDPOINT.CREATE_ORDER}`,
        bodyData: { courseId: id, amount, currency: "INR" },
        headers: { token: `${localStorage.getItem("token")}` },
      });

      console.log(orderResponse);

      if (orderResponse.data) {
        const options: RazorpayOrderOptions = {
          key: "rzp_test_HGacuFpexD8oZ4",
          amount: amount * 100,
          currency: "INR",
          name: "Study-Notion",
          description: courseName || "Course Purchase",
          order_id: `${orderResponse.data.razorpayOrderId}`,
          prefill: {
            name: firstName + " " + lastName,
            email: email,
            contact: contact_no,
          },
          theme: {
            color: "#F37254",
          },
        };

        const razorpayInstance = new Razorpay(options);
        razorpayInstance.open();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // stop loading 🔥
    }
  };




  return (
   <div className="w-[320px] bg-[#1C1D1F] rounded-lg overflow-hidden shadow-lg text-white absolute right-[10%] top-[35%]">
    <img
      src="https://img-c.udemycdn.com/course/240x135/567828_67d0.jpg"
      alt="course-thumbnail"
      className="w-full h-[180px] object-cover"
    />

  <div className="p-4">
    <p className="text-white text-2xl font-bold">Rs. {amount}</p>

    <button className="w-full mt-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 rounded">
      Add to Cart
    </button>

        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full mt-2 font-bold py-2 rounded border border-gray-600 
            ${
              loading
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-[#2D2F31] hover:bg-[#3b3d40] text-white"
            }`}
        >
          {loading ? "Processing..." : "Buy now"}
        </button>

    <p className="text-sm text-gray-400 mt-2 text-center">
      30-Day Money-Back Guarantee
    </p>

    <div className="mt-4">
      <p className="font-semibold mb-2">This course includes:</p>
      <ul className="space-y-1 text-sm text-green-400">
        <li className="flex items-center gap-2">
          ✅ 8 hours on-demand video
        </li>
        <li className="flex items-center gap-2">
          ✅ Full Lifetime access
        </li>
        <li className="flex items-center gap-2">
          ✅ Access on Mobile and TV
        </li>
        <li className="flex items-center gap-2">
          ✅ Certificate of completion
        </li>
      </ul>
    </div>

    <button className="mt-4 text-yellow-400 font-semibold text-sm hover:underline">
      Share
    </button>
  </div>
</div>

  )
}

export default BuyCourseCard
