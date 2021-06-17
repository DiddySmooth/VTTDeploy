import '../../../Styles/Stats.css'
const Stats = (props) => {
    return(
        <div className="statBox">
            <input className="statInput" defaultValue={props.num}></input>
            <p className="statLabel">{props.stat}</p>
        </div>
    )
}
export default Stats