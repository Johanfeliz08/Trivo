"use client";

import UserCard from "@/components/ui/Feed/UserCard";
import { useState, useEffect } from "react";
import { createSignalRConnection } from "@/lib/signalr";
import Cookie from "js-cookie";
import SimpleLoader from "../SimpleLoader";

export default function Feed({ setCurrentUserId }) {
  const userId = Cookie.get("userId");
  const [recomendedUsers, setRecommendedUsers] = useState([]); // State to hold recommended users return from SignalR
  const [currentItem, setCurrentItem] = useState(1); // Current item index for the carousel
  const totalItems = recomendedUsers.length; // Total number of items received
  const [isLoading, setIsLoading] = useState(false); // Loading state for the component
  setCurrentUserId(recomendedUsers ? recomendedUsers[0]?.usuarioId : null); // Set initial user ID if available

  useEffect(() => {
    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    setIsLoading(true);
    console.log("🔗 Conectando al hub de recomendaciones...");
    const connection = createSignalRConnection(userId);

    connection.start().then(() => {
      console.log("✅ Conectado al hub de recomendaciones");
      connection.on("RecibirRecomendaciones", (recomendaciones) => {
        console.log("📩 Recomendaciones recibidas:", recomendaciones);
        setRecommendedUsers(recomendaciones);
        setCurrentItem(1); // Reset current item to 1 when new recommendations are received
        setIsLoading(false);
      });
    });

    return () => {
      connection.stop();
      console.log("❌ Desconectado del hub de recomendaciones");
    };
  }, [userId]);

  useEffect(() => {
    const currentUser = recomendedUsers[currentItem - 1];
    if (currentUser) {
      setCurrentUserId(currentUser.usuarioId);
    }
  }, [currentItem, setCurrentUserId]);

  const handleLike = (e) => {
    e.preventDefault();

    if (totalItems === 0) return;

    if (currentItem < totalItems) {
      setCurrentItem(currentItem + 1);
    }
  };

  const handleDislike = (e) => {
    e.preventDefault();

    if (totalItems === 0) return;

    if (currentItem > 1) {
      setCurrentItem(currentItem - 1);
    }
  };

  return (
    <>
      <title>Trivo | Feed </title>
      <div className="feed-content flex flex-row justify-center items-center ">
        <div className="dislike-btn">
          <button type="button" className="cursor-pointer" onClick={handleDislike}>
            <div className="icon">
              <svg
                className="size-18 fill-bg-secondary stroke-2 stroke-primary hover:fill-primary ease-in-out duration-400"
                viewBox="-2.8 -2.8 61.60 61.60"
                xmlns="http://www.w3.org/2000/svg"
                strokeWidth="0.00056"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#7c3aed" strokeWidth="1.9040000000000004">
                  <path d="M 45.1563 49.0117 C 45.8594 49.7148 47.0315 49.7148 47.7112 49.0117 C 48.4139 48.3086 48.4139 47.1601 47.7112 46.4570 L 6.7188 5.4883 C 6.0157 4.7852 4.8438 4.7852 4.1407 5.4883 C 3.4610 6.1679 3.4610 7.3633 4.1407 8.0430 Z M 44.6407 39.4258 C 49.6796 33.9648 52.5390 28.1758 52.5390 22.3398 C 52.5390 14.0430 46.8673 8.1836 39.2501 8.1836 C 34.9141 8.1836 31.3985 10.2461 29.2657 13.4101 C 27.1797 10.2695 23.6407 8.1836 19.2813 8.1836 C 17.5001 8.1836 15.8360 8.5117 14.3360 9.1445 Z M 29.2657 51.2148 C 29.7579 51.2148 30.4610 50.8867 30.9766 50.5820 C 33.4376 48.9883 35.7579 47.3711 37.8672 45.6836 L 7.5626 15.4258 C 6.5548 17.4179 5.9923 19.7617 5.9923 22.3398 C 5.9923 32.3242 14.3594 42.1445 27.5782 50.5820 C 28.0704 50.8867 28.7969 51.2148 29.2657 51.2148 Z"></path>
                </g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M 45.1563 49.0117 C 45.8594 49.7148 47.0315 49.7148 47.7112 49.0117 C 48.4139 48.3086 48.4139 47.1601 47.7112 46.4570 L 6.7188 5.4883 C 6.0157 4.7852 4.8438 4.7852 4.1407 5.4883 C 3.4610 6.1679 3.4610 7.3633 4.1407 8.0430 Z M 44.6407 39.4258 C 49.6796 33.9648 52.5390 28.1758 52.5390 22.3398 C 52.5390 14.0430 46.8673 8.1836 39.2501 8.1836 C 34.9141 8.1836 31.3985 10.2461 29.2657 13.4101 C 27.1797 10.2695 23.6407 8.1836 19.2813 8.1836 C 17.5001 8.1836 15.8360 8.5117 14.3360 9.1445 Z M 29.2657 51.2148 C 29.7579 51.2148 30.4610 50.8867 30.9766 50.5820 C 33.4376 48.9883 35.7579 47.3711 37.8672 45.6836 L 7.5626 15.4258 C 6.5548 17.4179 5.9923 19.7617 5.9923 22.3398 C 5.9923 32.3242 14.3594 42.1445 27.5782 50.5820 C 28.0704 50.8867 28.7969 51.2148 29.2657 51.2148 Z"></path>
                </g>
              </svg>
            </div>
          </button>
        </div>
        <div className="users-container  2xl:w-[1400px] 2xl:h-[650px] xl:w-[800px] xl:h-[380px] ">
          <div className="users-caraousel flex flex-row justify-center items-center relative w-full h-full">
            {isLoading || recomendedUsers.length === 0 ? (
              <SimpleLoader />
            ) : (
              recomendedUsers.map((user, i) => {
                const globalIndex = i + 1; // índice 1-based
                const isActive = globalIndex === currentItem;
                const isNext = globalIndex === (currentItem % totalItems) + 1;
                const isPrev = globalIndex === (currentItem - 1 === 0 ? totalItems : currentItem - 1);

                let style = "hidden"; // Ocultamos por defecto
                if (isActive) {
                  style = "active absolute z-40 ease-in-out duration-500";
                } else if (isNext) {
                  style = "next absolute z-30 ease-in-out duration-500 2xl:translate-x-60 xl:translate-x-40 blur-[3px]";
                } else if (isPrev) {
                  style = "prev absolute z-30 ease-in-out duration-500 2xl:-translate-x-60 xl:-translate-x-40 blur-[3px]";
                }

                return <UserCard key={user.usuarioId} user={user} className={style} />;
              })
            )}
          </div>
        </div>
        <div className="like-btn">
          <button type="button" className="cursor-pointer" onClick={handleLike}>
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="512"
                height="512"
                viewBox="0 0 24 24"
                className="size-18 fill-bg-secondary stroke stroke-primary hover:fill-primary ease-in-out duration-400"
              >
                <g transform="matrix(0.76,0,0,0.76,2.88,2.99)">
                  <path
                    d="M17.5 1.917a6.4 6.4 0 0 0-5.5 3.3 6.4 6.4 0 0 0-5.5-3.3A6.8 6.8 0 0 0 0 8.967c0 4.547 4.786 9.513 8.8 12.88a4.974 4.974 0 0 0 6.4 0c4.014-3.367 8.8-8.333 8.8-12.88a6.8 6.8 0 0 0-6.5-7.05Z"
                    opacity="1"
                  ></path>
                </g>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
