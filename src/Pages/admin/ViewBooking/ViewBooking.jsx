import { useEffect,useState } from "react";
import API from "../../../services/api";
// import API from "../services/api";
// import AdminSidebar from "../components/AdminSidebar";

function ViewBookings(){

const [bookings,setBookings] = useState([])

useEffect(()=>{

API.get("/bookings")
.then(res=>setBookings(res.data))

},[])

return(

<div style={{display:"flex"}}>

{/* <AdminSidebar/> */}

<div style={{padding:"30px"}}>

<h1>Bookings</h1>

<table border="1">

<thead>

<tr>
<th>Booking Ref</th>
<th>User</th>
<th>Room</th>
<th>Dates</th>
</tr>

</thead>

<tbody>

{bookings.map(b=>(
<tr key={b._id}>

<td>{b.bookingRef}</td>
<td>{b.user?.name}</td>
<td>{b.room?.title}</td>
<td>{b.checkIn} - {b.checkOut}</td>

</tr>
))}

</tbody>

</table>

</div>

</div>

)

}

export default ViewBookings