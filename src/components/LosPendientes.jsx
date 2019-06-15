import React from 'react';
import PendienteInput from './PendienteInput.jsx'



    const LosPendientes = (props) => {
            return(
                    <div >
                        <div className="ListName">
                      
                             <ul  > 
                                  {
                                      props.name
                                  }
                             </ul>
                             <button className="buttonListName" onClick={() => {props.removeItem(props.index); console.log('props when onclick is called',props)}}>x</button>
                        </div>
                        <PendienteInput name= {props.name} />
                    </div>
                )
        }

 
export default LosPendientes;

  