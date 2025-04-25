import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

async function fetchFirstSeen(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.name;
    } catch {
        return "Unknown";
    }
}

function Card({ data }) {
    const [firstSeenName, setFirstSeenName] = useState('');
    let navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const name = await fetchFirstSeen(data.episode[0]);
            setFirstSeenName(name);
        };

        fetchData();
    }, [data.episode]);

    return (
        <div className="card" onClick={() => {
            navigate(`/character/${data.id}`);
        }}>
            <img src={data.image} alt={data.name} />

            <div className="card-data">
                <h2>{data.name}</h2>
                <p>{data.status + " - " + data.species}</p>
                <p className="grey">Last known location: </p>
                <p>{data.origin.name}</p>
                <p className="grey">First seen in: </p>
                <p>{firstSeenName}</p>
            </div>
        </div>
    )
}

export default Card;