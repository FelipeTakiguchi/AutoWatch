import React from 'react';
import "./styles.sass";

interface SelectProps {
    value: any;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({ value, onChange }: SelectProps) {
    return (
        <select className="select" value={value} onChange={onChange}>
            <option value="" disabled hidden>Selecione o status</option>
            <option value="Rodando">Rodando</option>
            <option value="Sem sinal">Sem sinal</option>
            <option value="Em crise">Em crise</option>
        </select>
    );
}
