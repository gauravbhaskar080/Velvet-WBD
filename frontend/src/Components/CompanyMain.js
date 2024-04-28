import React from 'react'
import CompanyNavBar from './CompanyNavBar'
import CompanyHomeMain from './CompanyHomeMain'

export default function CompanyMain({openPage,element}) {
  return (
    <div
        className="cm-main"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "flex-start",
          height: "720px"
        }}
      >
        <CompanyNavBar navTitle={element}></CompanyNavBar>
        <CompanyHomeMain element={element}/>
      </div>
  )
}
