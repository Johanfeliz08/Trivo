import * as signalR from "@microsoft/signalr";
import Cookie from "js-cookie";

export const createSignalRConnection = (usuarioId, url) => {
  const token = Cookie.get("tokenAcceso");
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(url, {
      accessTokenFactory: () => token,
    })
    .configureLogging(signalR.LogLevel.Information)
    .withAutomaticReconnect()
    .build();

  return connection;
};
