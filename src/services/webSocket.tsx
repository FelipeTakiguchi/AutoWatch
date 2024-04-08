import React, { useEffect } from 'react';

export default function WebSocketComponent() {
  useEffect(() => {
    const socket = new WebSocket('wss://esp32-mpu9250-autobox-backend.onrender.com/ws');

    socket.onopen = () => {
      console.log('WebSocket connection established.');
      // You can send data after connection is established if needed
      // socket.send('Hello from client!');
    };

    socket.onmessage = (event) => {
      console.log('Received message:', event.data);
      // Handle received message
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed.');
      // You may want to handle reconnection here
    };

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.close();
    };
  }, []);
  return <></>
};