import { withTitleExpander } from "../../utils/components/TitledComponent"
import { withTime } from "../../utils/hoc/with-date";


const PricingScreen=({time})=>{

    

    return (
        <div>
            here you get all the different pricing for our product
            pricing as on : {time.toLocaleDateString()}

           <ul>
            <li>Price#1</li>
            <li>Price#2</li>
            
            <li>Price#3</li>
            <li>Price#4</li>
            
            <li>Price#5</li>
            <li>Price#6</li>
            
            <li>Price#7</li>
            <li>Price#8</li>
            
           </ul>
        
        </div>
    )
}

export default withTime( withTitleExpander( PricingScreen, "Pricing"));