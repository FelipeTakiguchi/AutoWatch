"use client"
import React, { useEffect, useState } from "react";
import HeaderComponent from "@/components/header/header";
import Pagination from "@/components/pagination/pagination";
import Table from "@/components/tableComponent/table";
import "./styles.sass";
import ActionBar from "@/components/actionsBar/actionsBar";
import axios from 'axios';

export default function Home() {
  const [filter, setFilter] = useState("");
  const [selectedStatus, setSelectedStatus] = useState('');
  const [data, setData] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const page = 1;
  const nElements = 4;

  // https://domain.loophole.site/api/client/1/4/ricardo
  // https://domain.loophole.site/api/client/6605bbeef3e8db7f8672aa1f
  // https://domain.loophole.site/api/event/ABC123 

  useEffect(() => {
    fetchData();
  }, []);
  console.log(apiUrl);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl + "/api/client/" + page + "/" + nElements);

      setData(response.data.clients);
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
        <Table data={data} />
      </main>
      <nav className="centralize_bottom">
        <Pagination />
      </nav>
    </>
  );
}
