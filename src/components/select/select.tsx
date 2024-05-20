import React, { useState } from "react";
import Image from "../../../node_modules/next/image";
import "./styles.sass";
import arrownDownIcon from "@/assets/images/arrow_down.svg";
import useClientStore from "@/services/clientStore";

export default function Select() {
  const { statusFilter, setStatusFilter } = useClientStore();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="select_container">
      <div className="select" onClick={() => setExpanded(!expanded)}>
        <p className="select_label">
          {statusFilter == "" ? "Escolha um status" : statusFilter}
        </p>
        <Image
          src={arrownDownIcon}
          className={`arrow_down_icon ${
            expanded ? "expanded_anim" : "back_anim"
          }`}
          alt="arrow down icon"
          width={30}
        />
      </div>
      <div className={`opt_group ${expanded ? "expand_opt" : "hide_opt"}`}>
        {statusFilter != "" ? (
          <option
            onClick={() => {
              setStatusFilter("Todos");
              setExpanded(!expanded);
            }}
            value="Todos"
          >
            Todos
          </option>
        ) : null}
        <option
          onClick={() => {
            setStatusFilter("Rodando");
            setExpanded(!expanded);
          }}
          value="Rodando"
        >
          Rodando
        </option>
        <option
          onClick={() => {
            setStatusFilter("Sem Sinal");
            setExpanded(!expanded);
          }}
          value="Sem Sinal"
        >
          Sem Sinal
        </option>
        <option
          onClick={() => {
            setStatusFilter("Em Crise");
            setExpanded(!expanded);
          }}
          value="Em Crise"
        >
          Em Crise
        </option>
      </div>
    </div>
  );
}
