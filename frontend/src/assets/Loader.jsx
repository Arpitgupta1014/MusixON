import React from 'react';

function Loader({title}) {
  return (
    <div style={{"display":"flex","alignItems":"center","justifyContent":"center","margin":"auto","flexDirection":"column"}}>
        <img src="https://raw.githubusercontent.com/adrianhajdin/project_music_player/e513a28c6f831caab8e819142bde347148cec6c4/src/assets/loader.svg" alt="gif" style={{"height":"100px","width":"100px"}} />
        <h2 style={{"color":"#fff","fontSize":"18px","fontWeight":"400","fontFamily":"cursive","marginTop":"20px"}}>{title || "Loading"}</h2>
    </div>
  )
}
export default Loader;