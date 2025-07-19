"use client";

import Router from "next/router";

export default function redirectToLogin() {
  Router.push("/auth/login");
}
