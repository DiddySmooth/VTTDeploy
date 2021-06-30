const SavingThrows = () => {
    return (
        <div>
            <form>
                <input type="checkbox" value="strength" name="str"/>
                <label for="str">Str +1</label>
                <br />
                <input type="checkbox" value="dexterity" name="dex"/>
                <label for="dex">Dex +0</label>
                <br />
                <input type="checkbox" value="constitution" name="con"/>
                <label for="con">Con +2</label>
                <br />
                <input type="checkbox" value="wisdom" name="wis"/>
                <label for="wis">Wis +4</label>
                <br />
                <input type="checkbox" value="charisma" name="cha"/>
                <label for="cha">Cha +2</label>
                <br />
                <input type="checkbox" value="inteligence" name="int"/>
                <label for="int">Int -1</label>
            </form>
        </div>
    )   
}
export default SavingThrows