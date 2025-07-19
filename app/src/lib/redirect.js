"use client";

import Router from "next/router";

export default function RedirectToLogin() {
  Router.push("/auth/login");
}
