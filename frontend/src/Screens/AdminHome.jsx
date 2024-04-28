import React from 'react'
import AdminNavBar from "../Components/AdminNavBar"
import AdminHomeMain from '../Components/AdminHomeMain'

export default function AdminHome({element}) {
  return (
    <div
        className="ad-main"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "flex-start",
          height: "720px"
        }}
      >
        <AdminNavBar navTitle={element}/>
        <AdminHomeMain element={element}/>
      </div>
  )
}
