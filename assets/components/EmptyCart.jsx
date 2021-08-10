import React from 'react'
import {Link} from 'react-router-dom'
const EmptyCart = ({products}) => (

    <main className="p-4" style={{width:'100%', height:'500px', backgroundColor:'lightgray', lineHeight:'6px'}}>
       <p>Ostoskorisi on tyhjä.</p>
       <p>Jatka <Link to="/" style={{textDecoration:'none', color:'black'}}>tästä</Link> ostoksiasi.</p>
    </main>
)

export default EmptyCart