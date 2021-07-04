const CharacterInfo = () => {
    return (
        <div className= "CharacterInfoUI">
            <form className= "CharacterInfoUI">
                <label className="CharacterInfoInput" >Name:</label>
                <input className="CharacterInfoInput" defaultValue="Grayson"/>
                <label className="CharacterInfoInput" >Race:</label>
                <input className="CharacterInfoInput" defaultValue="Drow Elf"/>
                < br />
                <label className="CharacterInfoInput" >Class:</label>
                <input className="CharacterInfoInput" defaultValue="Ranger"/>ad1
                <label className="CharacterInfoInput" >Level:</label>
                <input className="CharacterInfoInput" defaultValue="17"/>
            </form>
        </div>
    )
}
export default CharacterInfo