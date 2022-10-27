import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

const initailState = {
  loading: null,
  error: null,
};

const deleteReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "DELETED-DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.playload };
    default:
      return state;
  }
};

export const useDeleteDocument = (docCollection) => {
  const [response, dispatch] = useReducer(deleteReducer, initailState);

  //deal with memory leak
  const [canceled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!canceled) {
      dispatch(action);
    }
  };

  const deleteDocument = async (id) => {
    checkCancelBeforeDispatch({
      type: "LOADING"
    });

    try {

        const deleteDocument = await deleteDoc(doc(db, docCollection, id))
      
      checkCancelBeforeDispatch({
        type: "DELETED_DOC",
        playload: deleteDocument,
      });
    } catch (error) {
      checkCancelBeforeDispatch({
        type: "ERROR",
        playload: error.message
      });
    }
  };

  useEffect (() => {
    return () => setCancelled(true)
  }, [])

  return {deleteDocument, response}
};
