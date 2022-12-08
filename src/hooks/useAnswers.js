import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useAnswers(id) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    async function fetchAnswers() {
      //Database Connection
      const db = getDatabase();
      const answersRef = ref(db, "answers/" + id + "/questions");
      const answersQuery = query(answersRef, orderByKey());
      try {
        setError(false);
        setLoading(true);
        const snapshot = await get(answersQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setAnswers((prevAnswers) => {
            return [...prevAnswers, ...Object.values(snapshot.val())];
          });
        }
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    }
    fetchAnswers();
  }, [id]);

  return {
    loading,
    error,
    answers,
  };
}
