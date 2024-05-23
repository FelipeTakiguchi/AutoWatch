import React, { useEffect, useState } from 'react';
import useClientStore from './clientStore';
import useNotificationStore from './notificationStore';

interface RowData {
  email: string;
  lastLocation: string;
  address: string;
  lastUpdated: Date;
  name: string;
  number: string;
  plate: string;
  vehicle: string;
  status: string;
}

interface MessageData {
  plate: string;
  location: string;
  lastUpdated: Date;
}

export default function WebSocketComponent() {
  const [event, setEvent] = useState<{ type: string, data: MessageData }>({ type: "", data: { plate: "", location: "", lastUpdated: new Date() } });
  const { type, data } = event as { type: string, data: MessageData };
  const { clients: initialClients, setClients } = useClientStore();
  const { setNewNotification } = useNotificationStore();
  const [clientsPromise, setClientsPromise] = useState<Promise<RowData[]> | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL!.replace("https", "wss") + "/ws";
  const socket = new WebSocket(apiUrl);

  useEffect(() => {
    setClientsPromise(new Promise(resolve => resolve(initialClients)));
  }, [initialClients]);


  useEffect(() => {
    async function get() {
      const clients = await clientsPromise;
      // Handle received message
      try {
        // Extract type and data properties
        const { plate, location, lastUpdated } = data;
        // console.log(data);
        
        if (type === "crashEvent") {
          setNewNotification({ plate: plate, status: "Em Crise", accidentDate: lastUpdated })
        }

        // Update clients based on the type of message
        if (type === "eventUpdate" || type === "lostSignal" || type === "crashEvent") {
          // Ensure clients has some value before updating
          if (clients && clients.length > 0) {
            setClients(clients.map(client => {
              if (client.plate === plate) {
                if((client.status === "Rodando" && type !== "eventUpdate") || (client.status === "Sem Sinal" && type !== "lostSignal") || (client.status === "Em Crise" && (type === "lostSignal" || type === "eventUpdate"))){

                }
                return {
                  ...client,
                  status: type === "eventUpdate" ? "Rodando" : type === "lostSignal" ? "Sem Sinal" : "Em Crise",
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

    get();
  }, [event])

  useEffect(() => {
    socket.onopen = () => {
      // console.log('WebSocket connection established.');
      // You may want to handle reconnection here
    };

    socket.onmessage = async (event) => {
      if (!event.data.startsWith('Welcome')) {
        // console.log(event.data);
        const message = JSON.parse(event.data);
        setEvent(message);
      }
    };

    socket.onclose = () => {
      // console.log('WebSocket connection closed.');
      // You may want to handle reconnection here
    };

  }, []);
};
