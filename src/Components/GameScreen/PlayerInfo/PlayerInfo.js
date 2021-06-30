import PlayerStats from "../PlayerInfo/PlayerStats"
import CharacterInfo from '../PlayerInfo/CharacterInfo'
import SavingThrows from "./SavingThrows"
import Skills from "./Skills"
const PlayerInfo = () => {
    return(
        <div className = "PlayerInfoUI">
            <PlayerStats />
            <CharacterInfo />
            <SavingThrows/>
            <Skills />
        </div>
    )
}
export default PlayerInfo