import React from 'react';
// import Close from '@material-ui/icons/Close';
// import Maximize from '@material-ui/icons/CheckBoxOutlineBlankSharp';
// import Minimize from '@material-ui/icons/RemoveSharp';
import './styles.scss'; 

// const { ipcRenderer } = window.require('electron');

const WindowBar = () => {
  return (
    <div id="titleBar">
      {/* <Minimize className="button" id="min-btn" onClick={() => ipcRenderer.send('min')} />
      <Maximize className="button" id="max-btn" onClick={() => ipcRenderer.send('max')} />
      <Close className="button" id="close-btn" onClick={() => ipcRenderer.send('close')} /> */}
    </div>
  );
}

export default WindowBar;