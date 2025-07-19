import * as signalR from "@microsoft/signalr";
import Cookie from "js-cookie";

export const createSignalRConnection = (usuarioId) => {
  const token = Cookie.get("tokenAcceso");
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(`http://localhost:5026/hubs/recomendaciones`, {
      accessTokenFactory: () => token,
    })
    .configureLogging(signalR.LogLevel.Information)
    .withAutomaticReconnect()
    .build();

  return connection;
};
