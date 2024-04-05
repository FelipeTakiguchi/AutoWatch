import React, { useEffect } from 'react';

export default function WebSocketComponent() {
  useEffect(() => {
    const socket = new WebSocket('wss://d13387d45efebb8c9c1ac35159e835c8.loophole.site/ws');

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