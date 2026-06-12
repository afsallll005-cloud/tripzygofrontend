import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./VisitorReviews.css";

function VisitorReviews() {

const reviews = [
{
text:"From the moment we arrived, every detail was perfectly taken care of. The rooms are stunning, the service impeccable, and the views absolutely breathtaking. We will absolutely be returning.",
author:"Salman"
},
{
text:"Amazing experience! The hospitality was world class and the resort views were unforgettable.",
author:"Anas"
},
{
text:"Beautiful rooms, friendly staff and excellent food. Highly recommended.",
author:"Aslah"
},
{
text:"One of the best luxury stays we've ever had.",
author:"Shibil T. | Expedia"
},
{
text:"Truly a paradise getaway with incredible service.",
author:"Shamil"
},
{
text:"From the moment we arrived, every detail was perfectly taken care of. The rooms are stunning, the service impeccable, and the views absolutely breathtaking. We will absolutely be returning.",
author:"Ayisha"
},
{
text:"Amazing experience! The hospitality was world class and the resort views were unforgettable.",
author:"Misriya"
},
{
text:"Beautiful rooms, friendly staff and excellent food. Highly recommended.",
author:"Sinan"
},
{
text:"Beautiful rooms, friendly staff and excellent food. Highly recommended.",
author:"Rihal"
},
];

const [current,setCurrent] = useState(0);


// AUTO SLIDE
useEffect(()=>{

const interval = setInterval(()=>{
setCurrent((prev)=>(prev + 1) % reviews.length)
},4000)

return ()=>clearInterval(interval)

},[])


return (

<section className="reviews">

<h1 className="reviews-title">VISITOR REVIEWS</h1>

<p className="reviews-subtitle">
Don't just take our word for it — hear from the guests who've experienced it for themselves.
</p>

<div className="review-box">

<AnimatePresence mode="wait">

<motion.div
key={current}
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
exit={{opacity:0,y:-40}}
transition={{duration:0.6}}
>

<p className="review-text">
"{reviews[current].text}"
</p>

<h4 className="review-author">
{reviews[current].author}
</h4>

</motion.div>

</AnimatePresence>


<div className="review-dots">

{reviews.map((_,index)=>(
<span
key={index}
className={current === index ? "dot active" : "dot"}
onClick={()=>setCurrent(index)}
></span>
))}

</div>

</div>

</section>

)

}

export default VisitorReviews;
