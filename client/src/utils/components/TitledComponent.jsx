import { useState } from "react";
import Conditional from "./Conditional";


/**
 * 
 expandable
    * none: disbale feature
    * true: enable feature with initially visible
    * false: disable feature with initially invisible.
 */
const TitledComponent = ({ title, children, expandable = null }) => {

    const [visible, setVisible] = useState(expandable);

   // console.log('expandable', expandable);
   // console.log('visible', visible);

    const handleVisibility = () => {
        setVisible(visible ? false : true);
    }

    const _style = {

    }



    if (expandable !== null) {
        _style.cursor = "pointer"
    }

   // console.log('_style', _style);


    return (
        <div className="titled-component">
            <h1 style={_style} onClick={handleVisibility} className="titled-component-title">{title}</h1>
            <div className="titled-component-content">
                <Conditional condition={expandable === null || visible}>
                    {children}
                </Conditional>
            </div>
        </div>
    )
}



export const withTitleExpander = (Target, title, expandable = true) => {

    return (props) => {

        return (
        <TitledComponent title={title} expandable={expandable} >
            <Target {...props} />
        </TitledComponent>
        )

    }
}

export default TitledComponent;