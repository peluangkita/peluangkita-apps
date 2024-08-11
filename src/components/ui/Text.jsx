
const Text = ({custom, children}) => {
    return (
        <p className={`text-gray-500   ${custom}`}>{children}</p>
    )
}

export default Text