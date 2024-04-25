import React, { useEffect, useState } from 'react';
import useClientStore from './clientStore';

interface RowData {
  email: string;
  lastLocation: string;
  lastUpdated: Date;
  name: string;
  number: string;
  plate: string;
  vehicle: string;
  status: string;
}

export default function WebSocketComponent() {
  const { clients: initialClients, setClients } = useClientStore();
  const [clientsPromise, setClientsPromise] = useState<Promise<RowData[]> | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL!.replace("https", "wss") + "/ws";
  const socket = new WebSocket(apiUrl);
  
  useEffect(() => {
    setClientsPromise(new Promise(resolve => resolve(initialClients)));
  }, [initialClients]);

  socket.onopen = () => {
    console.log('WebSocket connection established.');
    // You may want to handle reconnection here
  };

  socket.onmessage = async (event) => {
    if (clientsPromise) {
      const clients = await clientsPromise;
      if (!event.data.startsWith('Welcome')) {
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
      }
    }
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed.');
    // You may want to handle reconnection here
  };

};
