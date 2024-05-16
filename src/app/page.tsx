"use client";
import React, { useEffect, useState } from "react";
import HeaderComponent from "@/components/header/header";
import Pagination from "@/components/pagination/pagination";
import Table from "@/components/tableComponent/table";
import "./styles.sass";
import ActionBar from "@/components/actionsBar/actionsBar";
import axios from 'axios'; // Import axios directly
import useClientStore from "../services/clientStore";
import useNotificationStore from "../services/notificationStore";
import WebSocketComponent from "@/services/webSocket";
import Delimiter from "@/components/delimiter/delimiter";
import { signIn, signOut, useSession } from "next-auth/react";


export default function Home() {
  const { data: session, status } = useSession();
  const { page, nElements, setElementsReturned, setTotalElements, setTotalPages, setClients, statusFilter, inputValue, sortByPlate, sortByModel, sortByOwner, sortByStatus, orderBy, setOrderBy, isAscending, setIsAscending } = useClientStore();
  const { setNotifications, newNotification } = useNotificationStore();
  const [filter, setFilter] = useState("");
  const [selectedStatus, setSelectedStatus] = useState('');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;


  useEffect(() => {
    if (orderBy !== "") {
      if (!sortByPlate && !sortByModel && !sortByOwner && !sortByStatus) {
        setIsAscending(true);
      }
      else {
        setIsAscending(false);
        setOrderBy(sortByPlate ? "plate" : sortByModel ? "vehicle" : sortByOwner ? "name" : sortByStatus ? "status" : "status");
      }
    } else {
      setOrderBy(sortByPlate ? "plate" : sortByModel ? "vehicle" : sortByOwner ? "name" : sortByStatus ? "status" : "status");
    }

  }, [sortByPlate, sortByModel, sortByOwner, sortByStatus])

  useEffect(() => {
    if (status === "unauthenticated")
      signIn();
  }, [status]);

  useEffect(() => {
    fetchData();
  }, [page, nElements]);

  useEffect(() => {
    loadNotifications();
  }, [newNotification])

  const fetchData = async () => {
    const data = await requestClients();
    if (data) {
      data.clients.map((c: any) => {
        c.lastUpdated = new Date(c.lastUpdated).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
        return c;
      });

      const promises = data.clients.map((client: any) => {
        if (client.lastLocation) {
          const latitude = client.lastLocation.split(", ")[0];
          const longitude = client.lastLocation.split(", ")[1];
          if (latitude && longitude) {
            return getFormattedAddress(latitude, longitude)
              .then(address => {
                const addressParts = address.split(", ");
                const firstFour = addressParts.slice(0, 4).join(", ");
                const lastFour = addressParts.slice(-4).join(", ");
                client.address = `${firstFour}, ${lastFour}`;
                return client.lastLocation;
              });
          }
        }
      });

      Promise.all(promises)
        .then(locations => {
          setClients(data.clients);
          setTotalPages(data.totalPages);
          setTotalElements(data.totalElements);
          setElementsReturned(data.clients.length);
          console.log(data);
        })
        .catch(error => {
          console.error('Error fetching addresses:', error);
        });
    }
  };

  function getFormattedAddress(latitude: string, longitude: string) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.display_name) {
          return data.display_name;
        } else {
          throw new Error('No results found');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        return null;
      });
  }

  const loadNotifications = async () => {
    const data = await requestNotifications();
    if (data) {
      console.log(data)
      setNotifications(data.map((notification: NodeList) => ({
        plate: notification[0],
        status: notification[1],
        accidentDate: notification[2],
      })));
    }
  };

  const requestClients = async () => {
    try {
      const url = `${apiUrl}/api/client/${page}/${nElements}${inputValue ? "/" + inputValue : "/ALL"}${statusFilter ? "/" + statusFilter : "/Todos"}${orderBy ? "/" + orderBy : "/status"}${isAscending ? "/desc" : "/asc"}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  const requestNotifications = async () => {
    try {
      const response = await axios.get("https://esp32-mpu9250-autobox-backend.onrender.com/api/client/notifications");
      console.log(response.data);

      return response.data.notifications;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleStatusChange = (event: any) => {
    setSelectedStatus(event.target.value);
  };

  WebSocketComponent();

  return (
    <>
      <HeaderComponent />
      <ActionBar setFilter={setFilter} selectedStatus={selectedStatus} handleStatusChange={handleStatusChange} />
      <main className="main">
        <Table />
        <Delimiter />
      </main>
      <nav className="centralize_bottom">
        <Pagination />
      </nav>
    </>
  );
}
