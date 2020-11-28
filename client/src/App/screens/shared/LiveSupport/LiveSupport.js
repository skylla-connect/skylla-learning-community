import React from 'react'
import MenuLive from '../LiveSupport/MenuLive'
import Tabs from '../LiveSupport/Tabs'


export default function LiveSupport() {
    React.useEffect(() => {
        window.scrollTo(0, 0)
      }, []);
    
        return(
            <div>
                <MenuLive/>
                <Tabs/>
        </div>
    )
}

