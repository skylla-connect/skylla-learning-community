import React from 'react'
import MenuLive from './MenuLive'
import Tabs from './Tabs'


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

