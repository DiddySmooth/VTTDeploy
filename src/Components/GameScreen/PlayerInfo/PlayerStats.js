import Stats from "../PlayerInfo/Stats"
const PlayerStats = () => {
    return(
        <div className = "StatsUI">
            <Stats num="12" stat="Str"/>
            <Stats num="16" stat="Dex"/>
            <Stats num="15" stat="Con"/>
            <Stats num="14" stat="Wis"/>
            <Stats num="13" stat="Cha"/>
            <Stats num="10" stat="Int"/>

        </div>
    )
}
export default PlayerStats