import { useEffect, useState } from "react";
import { useParams } from "react-router";

function CharactersDetails() {
    const [characterData, setCharacterData] = useState(null)
    const [episodes, setEpisodes] = useState([]);

    let { id } = useParams()

    async function getData() {
        try {
            const response = await fetch('https://rickandmortyapi.com/api/character/' + id)
            const data = await response.json()
            setCharacterData(data)


            const episodeDataPromises = data.episode.map(async (url) => {
                const response = await fetch(url);
                return response.json();
            });

            const episodesData = await Promise.all(episodeDataPromises);
            setEpisodes(episodesData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, [id])

    return (
        <div className="character-card-container">
            {characterData && <div className="character-card">
                <img src={characterData.image} alt={characterData.name} style={{ borderRadius: '8px' }} />

                <h2>Name: {characterData.name || "Unknown"}</h2>
                <div>Status: {characterData.status || "Unknown"}</div>
                <div>Species: {characterData.species || "Unknown"}</div>
                <div>Type: {characterData.type || "Unknown"}</div>
                <div>Gender: {characterData.gender || "Unknown"}</div>
                <div>Origin: {characterData.origin.name}</div>
                <div>Location: {characterData.location.name}</div>
                <div>Episodes: </div>

                <div className="episodes">
                    {episodes.map((episode, index) => (
                        <div className="episode" key={index}>
                            <p>Episode name: {episode.name}</p>
                            <p>Air Date: {episode.air_date}</p>
                            <p>Episode: {episode.episode}</p>
                        </div>
                    ))}
                </div>

            </div>}
        </div >
    )
}

export default CharactersDetails;