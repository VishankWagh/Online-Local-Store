import React from 'react'

const OverviewCard = (props) => {
  return (
    <div className="o-card" >
      <div className="o-head">
        <div className="o-h">
          {props.oHead}
        </div>
        <span className="material-symbols-outlined">
          {props.icon}
        </span>
      </div>
      <div className="o-value">{props.oValue ? props.oValue : 0}</div>
    </div>
  )
}

export default OverviewCard
