import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppButton.css";

const WhatsAppButton = () => {
  // Remove all non-digit characters from phone number
  const phoneNumber = "918882894991"; // Note: Removed the '+' sign
  const message = "Hello, I have a question!"; // Optional pre-filled message

  const handleClick = () => {
    // Create the WhatsApp URL
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // For mobile devices, use window.location.href instead of window.open
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href = url;
    } else {
      window.open(url, "_blank");
    }
  };

  return (
    <div className="whatsapp-button" onClick={handleClick}>
      <FaWhatsapp className="whatsapp-icon" />
      <span className="whatsapp-text">Chat with us</span>
    </div>
  );
};

export default WhatsAppButton;