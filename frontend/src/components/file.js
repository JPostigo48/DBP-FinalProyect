import React, { useEffect, useState } from "react";
import { apigetFile } from "../api/post";
import { API } from "../config/config";


const ShowFile = ({id}) => {

  return(
    <div>
      <embed
        src={`${API}/p/file/${id}`}
        width="500"
        height="600"
        type="application/pdf"
      />
    </div>)
};

export default ShowFile;
