
import React, {useState} from 'react';
import * as Space from 'react-spaces';


const LeftDrawer = props => {

  const [collapsed, setCollapsed] = useState(false)
  const [expandedWidth, setExpandedWidth] = useState(props.width)

  const width = (collapsed) ? "25px" : expandedWidth     // initiall could be 25%
  const symbol = (collapsed) ? <>&gt;</> : <>&lt;</>

  const Toggle = (info) => {
    if (!collapsed)
        setExpandedWidth(info.width + 'px')
    setCollapsed(!collapsed)
  }

return (
  <Space.LeftResizable size={width} trackSize={true} style={props.style}>
    <Space.Info>
        {info => (<>
                    <Space.Top size="25px" trackSize={true} style={props.style}>
                      <Space.Right size="25px" trackSize={true} style={props.style}>
                        <button onClick={() => Toggle(info)}>{symbol}</button>
                      </Space.Right>
                    </Space.Top>
                    {props.children}
                  </>)}
  </Space.Info>
</Space.LeftResizable>
);
}

export default LeftDrawer;