import { useQuery } from "@tanstack/react-query";

export const usePlayersCount = (setSmbd) => {
  return useQuery({
    queryKey: ["playersCount"],
    queryFn: () =>
      fetch("http://localhost:3005/player").then((res) => {
        if (!res.ok) throw new Error("Ошибка загрузки игроков");
        return res.json();
      }),
    onSuccess: (data) => {
      if (Array.isArray(data)) {
        setSmbd(data.length);
      }
    },
    onError: () => {
      setSmbd(0);
    },
    // Важные настройки для мгновенного отображения
    staleTime: 5 * 60 * 1000, // 5 минут - данные считаются свежими
    cacheTime: 10 * 60 * 1000, // 10 минут - время хранения в кэше
  });
};
