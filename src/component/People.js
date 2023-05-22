import React, { useState } from "react";
import { useQuery } from "react-query";
import Person from "./Person";
import axios from "axios";

const fetchPeople = async (key, page) => {
    const res = await axios.get(`http://swapi.dev/api/people/?page=${page}`);
    return res.data;
}

const People = () => {
    const [page, setPage] = useState(1)
    const { data, status } = useQuery(['people', page], ({key}) => fetchPeople(key,page));

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
            <h2>People</h2>
            
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
                    {data.results.map(person => <Person key={person.name} person={person} />)}
                </div>
            )}
        </div>
    );
}

export default People