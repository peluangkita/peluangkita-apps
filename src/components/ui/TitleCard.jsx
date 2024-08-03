import Subtitle from "./Subtitle"
  
function TitleCard({title, children, topMargin, TopSideButtons}){
    return(
        <div className={`card w-full p-6 bg-white shadow-sm ` + (topMargin || "mt-6")}>

        {/* Title for Card */}
            <Subtitle styleClass={TopSideButtons ? "inline-block" : ""}>
            {title}

            {/* Top side button, show only if present */}
            {
                TopSideButtons && <div className="inline-block float-right">{TopSideButtons}</div>
            }
            </Subtitle>
            
            <div className="divider mt-2"></div>
        
            {/** Card Body */}
            <div className='h-full w-full pb-6 bg-white'>
                {children}
            </div>
        </div>
        
    )
}
  
  
  export default TitleCard