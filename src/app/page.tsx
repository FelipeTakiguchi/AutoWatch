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

export default function Home() {
  const { page, nElements, setElementsReturned, setTotalElements, setTotalPages, setClients } = useClientStore();
  const { setNotifications } = useNotificationStore();
  const [filter, setFilter] = useState("");
  const [selectedStatus, setSelectedStatus] = useState('');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchData();
    loadNotifications();
  }, [page, nElements]);

  const fetchData = async () => {
    const data = await requestClients();
    if(!data) return;
    if (data) {
      data.clients.map((c: any) => {
        c.lastUpdated = new Date(c.lastUpdated).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
        return c;
      });
      setClients(data.clients);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
      setElementsReturned(data.clients.length);
      console.log(data);
    }

  };

  const loadNotifications = async () => {
    const data = await requestNotifications();

    if (data) {
      setNotifications(data.map((notification: NodeList) => ({
        plate: notification[0],
        status: notification[1],
      })));
    }
  };

  const requestClients = async () => {
    try {
      const url = `${apiUrl}/api/client/${page}/${nElements}`;
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
