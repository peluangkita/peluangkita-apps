
const Badge = ({color, text}) => {
    return (
        <div className={`badge w-20 p-2 text-white font-normal ${color}`}>{text}</div>
    )
}

export default Badge