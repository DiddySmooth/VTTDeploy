import '../Styles/Game.css'
import Chat from '../Components/Chat'
import DiceBox from "../Components/DiceBox"
import UserBar from '../Components/UserBar'
import GameField from '../Components/GameField'


const Game = () => {
    return(
        <div className="gameScreen">
            <div className="playArea">
                <UserBar />
                <GameField />
            </div>
            <div className="chatArea">
                <Chat />
                <DiceBox />
                <div className="playerInfo">Player Info</div>
            </div>
            
        </div>
        
    )
}
export default Game