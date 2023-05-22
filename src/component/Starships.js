import React, {useState} from "react";
import { useQuery } from "react-query";
import Starship from "./Starship";
import axios from "axios";

const fetchStarships = async (key, page) => {
    const res = await axios.get(`http://swapi.dev/api/starships/?page=${page}`);
    return res.data;
}

const Starships = () => {
    const [page, setPage] = useState(1)
    const { data, status } = useQuery(['starships', page], ({key}) => fetchStarships(key,page));

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
            <h2>Starships</h2>
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
                    {data.results.map(starship => <Starship key={Starship.name} starship={starship} />)}
                </div>
            )}
        </div>
    )
}

export default Starships