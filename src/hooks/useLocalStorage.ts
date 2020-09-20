import { useState, useEffect } from "react";

const PREFIX = "online-editor-";

type Props = {
  key: string;
  initialValue: any;
};

export default function useLocalStorage(props: Props) {
  const { key, initialValue } = props;
  const prefixedKey = PREFIX + key;

  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);

    if (jsonValue) return JSON.parse(jsonValue);

    if (typeof initialValue === "function") return initialValue();
    else return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}
