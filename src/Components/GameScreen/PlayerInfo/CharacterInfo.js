const CharacterInfo = () => {
    return (
        <div className= "CharacterInfoUI">
            <form>
                <div>
                    <label>Name:</label>
                    <input className="CharacterInfoInput" defaultValue="Grayson"/>
                    <label>Race:</label>
                    <input className="CharacterInfoInput" defaultValue="Drow Elf"/>
                </div>
                <div>
                    <label>Class:</label>
                    <input className="CharacterInfoInput" defaultValue="Ranger"/>
                    <label>Level:</label>
                    <input className="CharacterInfoInput" defaultValue="17"/>
                </div>
            </form>
        </div>
    )
}
export default CharacterInfo