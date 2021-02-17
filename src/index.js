import React from 'react';
import {render} from 'react-dom';

function Hi() {
  //debugger;
  return(
    <div>
      Hi.
    </div>
  )
}

render(<Hi />, document.getElementById('root')); 