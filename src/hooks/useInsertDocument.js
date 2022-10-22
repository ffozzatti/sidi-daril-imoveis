import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERT_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.playload };
    default:
      return state;
  }
};

export const useInsertDocument = (docCollection) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);

  //deal with memory leak
  const [canceled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!canceled) {
      dispatch(action);
    }
  };

  const insertDocument = async (document) => {
    checkCancelBeforeDispatch({
      type: "LOADING"
    });

    try {
      const newDocument = { ...document, createdAt: Timestamp.now() };

      const insertDocument = await addDoc(
        collection(db, docCollection),
        newDocument
      );

      checkCancelBeforeDispatch({
        type: "INSERT_DOC",
        playload: insertDocument,
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

  return {insertDocument, response}
};
