"use client"
import React, { useEffect, useState } from "react";
import HeaderComponent from "@/components/header/header";
import Pagination from "@/components/pagination/pagination";
import Table from "@/components/tableComponent/table";
import "./styles.sass";
import ActionBar from "@/components/actionsBar/actionsBar";
const axios = require('axios');
import useClientStore from "../services/store";
import WebSocketComponent from "@/services/webSocket";

export default function Home() {
  const { page, nElements, setTotalPages, clients, setClients } = useClientStore();
  const [filter, setFilter] = useState("");
  const [selectedStatus, setSelectedStatus] = useState('');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchData();
  }, [page]);
  
  console.log(apiUrl);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl + "/api/client/" + page + "/" + nElements);

      setClients(response.data.clients);
      setTotalPages(response.data.totalPages)
      console.log(response.data);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleStatusChange = (event: any) => {
    setSelectedStatus(event.target.value);
  };

  useEffect(() => {
    console.log(filter)
  }, [filter]);

  return (
    <>
      <HeaderComponent />
      <ActionBar setFilter={setFilter} selectedStatus={selectedStatus} handleStatusChange={handleStatusChange} />
      <main>
        <Table data={clients} />
      </main>
      <nav className="centralize_bottom">
        <Pagination/>
      </nav>
      <WebSocketComponent/>
    </>
  );
}
