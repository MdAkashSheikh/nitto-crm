
import React, { useState } from "react";
import { MultiSelect } from 'primereact/multiselect';

export default function BasicDemo() {
    const [selectedCities, setSelectedCities] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    console.log(selectedCities, 'selectedCities')
    console.log(typeof selectedCities, 'selectedCities')

    return (
        <div className="card flex justify-content-center">
            <MultiSelect value={selectedCities} onChange={(e) => setSelectedCities(e.value)} options={cities} optionLabel="name" 
                placeholder="Select Cities" maxSelectedLabels={3} className="w-full md:w-20rem" />
        </div>
    );
}