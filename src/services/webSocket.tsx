import React, { useEffect } from 'react';
import useClientStore from './clientStore';

export default function WebSocketComponent() {
  const { clients, setClients } = useClientStore();

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL!.replace("http", "ws");
    const socket = new WebSocket(apiUrl);

    socket.onopen = () => {
      console.log('WebSocket connection established.');
      // You can send data after connection is established if needed
      // socket.send('Hello from client!');
    };
    socket.onmessage = (event) => {
      if (event.data.startsWith('Welcome')) {
        console.log('Welcome message received:', event.data);
        return; // Exit early, no need to parse
      }

      // Handle received message
      try {
        const message = JSON.parse(event.data);
        // Extract type and data properties
        const { type, data } = message;
        const { plate, location } = data;

        // Update clients based on the type of message
        if (type === "eventUpdate" || type === "lostSignal") {
          // Ensure clients has some value before updating
          if (clients && clients.length > 0) {
            setClients(clients.map(client => {
              if (client.plate === plate) {
                return {
                  ...client,
                  status: type === "eventUpdate" ? "Rodando" : "Sem Sinal",
                  lastLocation: location
                };
              }
              return client;
            }));
          }
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed.');
      // You may want to handle reconnection here
    };
    return () => {
      socket.close();
    };
  }, [clients, setClients]); // Include clients and setClients in dependency array

  return <></>;
};
