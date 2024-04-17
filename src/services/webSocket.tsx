import React, { useEffect } from 'react';
import useClientStore from './clientStore';

export default function WebSocketComponent() {
  const { clients, setClients } = useClientStore();
  const timeoutMap: Record<string, NodeJS.Timeout> = {}; // Define the type of timeoutMap

  // Establish WebSocket connection when the component mounts
  const apiUrl = process.env.NEXT_PUBLIC_API_URL!.replace("https", "wss") + "/ws";
  const socket = new WebSocket(apiUrl);

  socket.onopen = () => {
    console.log('WebSocket connection established.');
    socket.send('Client has established a connection!');
  };

  useEffect(() => {
    socket.onmessage = (event) => {
      console.log('Received message:', event.data);

      try {
        const jsonData = JSON.parse(event.data);
        if (jsonData && jsonData.data && jsonData.data.plate) {
          const plate = jsonData.data.plate;
          const location = jsonData.data.location;

          console.log('Plate:', plate);
          console.log('Location:', location);
          console.log(clients);

          const updatedClients = clients.map(client => {
            if (client.plate === plate) {
              client.lastLocation = location;
              client.status = "Rodando";

              // Clear existing timeout for this plate
              if (timeoutMap[plate]) {
                clearTimeout(timeoutMap[plate]);
                console.log("Resetou a placa " + plate);
                console.log(timeoutMap[plate]);
              }

              // Set a new timeout for this plate
              timeoutMap[plate] = setTimeout(() => {
                const updatedClients = clients.map(client => {
                  if (client.plate === plate && client.status === "Rodando") {
                    client.status = "Sem Sinal";
                  }
                  return client;
                });
                setClients(updatedClients);
              }, 13000);
            }
            return client;
          });

          setClients(updatedClients);
        } else {
          console.log('Invalid JSON format or missing data.');
        }
      } catch (error) { }
    };

    // Cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      socket.close();
    };
  }, [clients]);

  return <></>;
}
