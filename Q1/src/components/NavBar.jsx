import { useContext } from 'react'
import Logo from '../assets/Rick_And_Morty_(2).svg'
import { AppContext } from '../Contexts/AppContexts'
import { useNavigate, useLocation } from "react-router";

function NavBar() {
    const { state, dispatch } = useContext(AppContext);
    let navigate = useNavigate();
    let { pathname } = useLocation();

    function randomCharacterHandler() {
        const randomID = Math.floor(Math.random() * 826) + 1;
        navigate(`/character/${randomID}`);
    }

    return (
        <nav>
            <img src={Logo} alt="Rick And Morty" onClick={() => navigate("/")} />

            <div>
                <div>
                    <button type="button" onClick={randomCharacterHandler}>Random Character</button>
                </div>

                {pathname == '/' && <div className="pageControlContainer">
                    <button type="button" onClick={() => {
                        if (state.page > 1) {
                            dispatch({ type: 'SET_PAGE', payload: state.page - 1 })
                        }
                    }}>Previous</button>

                    <span>{state.page}</span>

                    <button type="button" onClick={() => {
                        dispatch({ type: 'SET_PAGE', payload: state.page + 1 })
                    }}>Next</button>
                </div>}
            </div>
        </nav>
    )
}

export default NavBar;