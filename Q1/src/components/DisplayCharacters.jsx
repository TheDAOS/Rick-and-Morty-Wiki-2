import { useContext } from "react";
import { AppContext } from "../Contexts/AppContexts";
import Card from "./Card";


function DisplayCharacters() {

    const { state } = useContext(AppContext)
    // console.log(state);
    const { characters } = state;


    return (
        <div className="cardDIV">
            {characters.map((character) => {
                return <Card data={character} />
            })}
        </div>
    )
}

export default DisplayCharacters;