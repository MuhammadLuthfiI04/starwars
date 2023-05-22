import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async (key, page) => {
    const res = await axios.get(`http://swapi.dev/api/planets/?page=${page}`);
    return res.data;
}

const Planets = () => {
    const [page, setPage] = useState(1)
    const { data, status } = useQuery(['planets', page], ({key}) => fetchPlanets(key,page));

    const handlePrevious = () => {
        if (page > 1) {
        setPage((prevPage) => prevPage - 1);
        }
    };
        
    const handleNext = () => {
        setPage((prevPage) => prevPage + 1);
    };
    
    return (
        <div>
            <h2>Planets</h2>
            <hr />
            <br></br>

            <div className="page">
                <button onClick={handlePrevious}>Previous</button>
                <h3>{page}</h3>
                <button onClick={handleNext}>Next</button>
            </div>

            {status === 'loading' && (
                <div>Loading data...</div>
            )}
            {status === 'error' && (
                <div>Error fetching data</div>
            )}
            {status === 'success' && (
                <div>
                    {data.results.map(planet => <Planet key={planet.name} planet={planet} />)}
                </div>
            )}
        </div>
    );
}

export default Planets