"use client"
import React, { useEffect, useState } from "react";
import Filter from "@/components/filter/filter";
import HeaderComponent from "@/components/header/header";
import Pagination from "@/components/pagination/pagination";
import Table from "@/components/tableComponent/table";
import "./styles.sass";
import ActionBar from "@/components/actionsBar/actionsBar";

export default function Home() {
  const [filter, setFilter] = useState("");
  const [selectedStatus, setSelectedStatus] = useState('');

  const data = [
    { placa: 'ABC1234', modelo: 'Toyota Corolla', dono: 'John Doe', status: 'Em crise', infos: { localizacao: "Av das torres 1024 - Curitiba-PR Brasil | lat:65.1231, long -31.1213", risco: "alto", impacto: 90, suporte: 76 } },
    { placa: 'DEF5678', modelo: 'Honda Civic', dono: 'Jane Smith', status: 'Rodando', infos: { localizacao: "Av das torres 1024 - Curitiba-PR Brasil | lat:65.1231, long -31.1213" } },
    { placa: 'GHI9012', modelo: 'Ford Mustang', dono: 'Bob Johnson', status: 'Sem sinal', infos: { localizacao: "Av das torres 1024 - Curitiba-PR Brasil | lat:65.1231, long -31.1213" } },
    { placa: 'JKL3456', modelo: 'Chevrolet Cruze', dono: 'Alice Brown', status: 'Rodando', infos: { localizacao: "Av das torres 1024 - Curitiba-PR Brasil | lat:65.1231, long -31.1213" } },
    { placa: 'MNO7890', modelo: 'Tesla Model S', dono: 'Eve Wilson', status: 'Rodando', infos: { localizacao: "Av das torres 1024 - Curitiba-PR Brasil | lat:65.1231, long -31.1213" } }
  ];

  const handleStatusChange = (event: any) => {
    setSelectedStatus(event.target.value);
  };

  useEffect(() => {
    console.log(filter)
  }, [filter]);

  return (
    <>
      <HeaderComponent />
      <ActionBar setFilter={setFilter} selectedStatus={selectedStatus} handleStatusChange={handleStatusChange}/>
      <main>
        <Table data={data} />
      </main>
      <nav className="centralize_bottom">
        <Pagination />
      </nav>
    </>
  );
}
