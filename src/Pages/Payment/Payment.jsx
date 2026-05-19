import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../services/api";

function Payment() {
  const { bookingId } = useParams(); // Changed 'id' to 'bookingId' to match App.js
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get(`/bookings/${bookingId}`);
        setData(res.data);
      } catch (err) {
        console.error("Error fetching booking", err);
      }
    };
    load();
  }, [bookingId]);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Payment for Booking: {data.bookingRef}</h1>
      <p>Total: ₹{data.totalPrice}</p>
      {/* QR Code logic remains the same */}
    </div>
  );
}

export default Payment;