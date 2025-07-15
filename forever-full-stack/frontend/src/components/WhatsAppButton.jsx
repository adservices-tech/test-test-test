import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppButton.css";

const WhatsAppButton = () => {
  const phoneNumber = "+918882894991"; // Replace with your WhatsApp number
  const message = "Hello, I have a question!"; // Optional pre-filled message

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="whatsapp-button" onClick={handleClick}>
      <FaWhatsapp className="whatsapp-icon" />
      <span className="whatsapp-text">Chat with us</span>
    </div>
  );
};

export default WhatsAppButton;