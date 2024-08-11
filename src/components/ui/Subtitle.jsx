function Subtitle({styleClass, children}){
    return(
        <div className={`text-xl font-semibold text-primary ${styleClass}`}>{children}</div>
    )
}

export default Subtitle