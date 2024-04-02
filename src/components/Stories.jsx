"use client";
import minifaker, { username } from "minifaker";
import "minifaker/locals"
import { useEffect, useState } from "react";

export default function Stories() {
  const [storieUsers, setStorieUsers] = useState([]);

  useEffect(() => {
    const storyUsers = minifaker.array(20, (i) => (
      {
        username: minifaker.username({locale: 'en'})
      }
    ))
  }, [])

  return <div></div>;
}
