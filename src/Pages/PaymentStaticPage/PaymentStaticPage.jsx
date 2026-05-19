import React, { useState } from "react";
import QRCode from "qrcode";
import "./PaymentStaticPage.css";

function PaymentStaticPage() {

    const [method, setMethod] = useState("card");
    const [loading, setLoading] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const [bookingData, setBookingData] = useState(null);

    const [errors, setErrors] = useState({});

    const [card, setCard] = useState({
        number: "",
        exp: "",
        cvv: "",
        name: ""
    });

    const [upi, setUpi] = useState("");
    const [bank, setBank] = useState("SBI");

    // CARD NUMBER FORMAT
    const handleCardInput = (e) => {

        let v = e.target.value
            .replace(/\D/g, "")
            .substring(0, 16);

        v = v.replace(/(.{4})/g, "$1 ").trim();

        setCard({
            ...card,
            number: v
        });

    };

    // HANDLE CARD INPUTS
    const handleCardChange = (e) => {

        setCard({
            ...card,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: ""
        });

    };

    // VALIDATION
    const validateForm = () => {

        let newErrors = {};

        // CARD VALIDATION
        if (method === "card") {

            if (!card.name.trim()) {
                newErrors.name = "Card holder name is required";
            }

            if (
                card.number.replace(/\s/g, "").length !== 16
            ) {
                newErrors.number =
                    "Card number must be 16 digits";
            }

            if (!card.exp.trim()) {
                newErrors.exp = "Expiry date is required";
            }

            if (
                !/^\d{2}\/\d{2}$/.test(card.exp)
            ) {
                newErrors.exp =
                    "Expiry format should be MM/YY";
            }

            if (
                !/^\d{3}$/.test(card.cvv)
            ) {
                newErrors.cvv =
                    "CVV must be 3 digits";
            }
        }

        // UPI VALIDATION
        if (method === "upi") {

            if (!upi.trim()) {
                newErrors.upi = "UPI ID is required";
            }

            if (
                !/^[\w.-]+@[\w]+$/.test(upi)
            ) {
                newErrors.upi =
                    "Enter valid UPI ID";
            }
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    // GENERATE QR
    const generateQR = async (data) => {

        const canvas =
            document.getElementById("qr-canvas");

        if (!canvas) return;

        const qrData = JSON.stringify(data);

        await QRCode.toCanvas(canvas, qrData, {
            width: 220,
            margin: 2
        });

    };

    // PROCESS PAYMENT
    const processPayment = async () => {

        // VALIDATION CHECK
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setShowQR(false);

        setTimeout(() => {

            const booking = {
                id:
                    "BK" +
                    Date.now().toString().slice(-8),
                travelerName: "Guest",
                checkin: "-",
                checkout: "-",
                total: 0,
                status: "confirmed"
            };

            setBookingData(booking);

            setLoading(false);

            setShowQR(true);

            setTimeout(() => generateQR(booking), 200);

        }, 1500);
    };

    // DOWNLOAD QR
    const downloadQR = () => {

        const canvas =
            document.getElementById("qr-canvas");

        const link =
            document.createElement("a");

        link.download = "booking-qr.png";

        link.href =
            canvas.toDataURL("image/png");

        link.click();

    };

    return (

        <div className="rare-payment-wrapper">

            {/* HEADER */}
            <div className="rare-bookingHeader">

                <h1>Secure Payment</h1>

                <p>
                    Complete your booking safely
                    with encrypted checkout
                </p>

            </div>

            {/* PAYMENT BOX */}
            <div id="rare-page-payment">

                <h2>Payment Method</h2>

                {/* METHOD BUTTONS */}
                <div className="rare-method-box">

                    <button
                        className={
                            method === "card"
                                ? "rare-active"
                                : ""
                        }
                        onClick={() => setMethod("card")}
                    >
                        Card
                    </button>

                    <button
                        className={
                            method === "upi"
                                ? "rare-active"
                                : ""
                        }
                        onClick={() => setMethod("upi")}
                    >
                        UPI
                    </button>

                    <button
                        className={
                            method === "bank"
                                ? "rare-active"
                                : ""
                        }
                        onClick={() => setMethod("bank")}
                    >
                        Bank
                    </button>

                </div>

                {/* FORM */}
                <div className="rare-payment-form-group">

                    {/* CARD */}
                    {method === "card" && (
                        <>
                            <input
                                placeholder="Name on Card"
                                name="name"
                                value={card.name}
                                onChange={handleCardChange}
                            />

                            {errors.name && (
                                <small className="errorText">
                                    {errors.name}
                                </small>
                            )}

                            <input
                                placeholder="Card Number"
                                value={card.number}
                                onChange={handleCardInput}
                            />

                            {errors.number && (
                                <small className="errorText">
                                    {errors.number}
                                </small>
                            )}

                            <div className="rare-input-row">

                                <div>
                                    <input
                                        placeholder="MM/YY"
                                        name="exp"
                                        value={card.exp}
                                        onChange={handleCardChange}
                                    />

                                    {errors.exp && (
                                        <small className="errorText">
                                            {errors.exp}
                                        </small>
                                    )}
                                </div>

                                <div>
                                    <input
                                        placeholder="CVV"
                                        name="cvv"
                                        maxLength="3"
                                        value={card.cvv}
                                        onChange={handleCardChange}
                                    />

                                    {errors.cvv && (
                                        <small className="errorText">
                                            {errors.cvv}
                                        </small>
                                    )}
                                </div>

                            </div>
                        </>
                    )}

                    {/* UPI */}
                    {method === "upi" && (
                        <>
                            <input
                                placeholder="UPI ID"
                                value={upi}
                                onChange={(e) => {
                                    setUpi(e.target.value);

                                    setErrors({
                                        ...errors,
                                        upi: ""
                                    });
                                }}
                            />

                            {errors.upi && (
                                <small className="errorText">
                                    {errors.upi}
                                </small>
                            )}
                        </>
                    )}

                    {/* BANK */}
                    {method === "bank" && (
                        <select
                            value={bank}
                            onChange={(e) =>
                                setBank(e.target.value)
                            }
                        >
                            <option>SBI</option>
                            <option>HDFC</option>
                            <option>ICICI</option>
                            <option>Axis</option>
                        </select>
                    )}

                </div>

                {/* PAY BUTTON */}
                <button
                    className="rare-pay-btn"
                    onClick={processPayment}
                    disabled={loading}
                >
                    {loading
                        ? "Processing..."
                        : "Pay Now 🔒"}
                </button>

            </div>

            {/* QR SECTION */}
            {showQR && (

                <div id="rare-page-qrcode">

                    <h2 className="rare-page-qrcode-h2">
                        Booking Confirmed
                    </h2>

                    <div id="qr-booking-id">
                        {bookingData?.id}
                    </div>

                    <canvas id="qr-canvas"></canvas>

                    <div id="qr-details">
                        Thank you for booking!
                    </div>

                    <button
                        className="rare-pay-btn"
                        onClick={downloadQR}
                    >
                        Download QR
                    </button>

                </div>

            )}

        </div>
    );
}

export default PaymentStaticPage;