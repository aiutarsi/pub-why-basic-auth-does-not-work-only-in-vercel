import { NextResponse, NextRequest } from "next/server";

import { env, EnvironmentalVariableType } from "./modules/utils/env";

const authRequiredEnvironments: EnvironmentalVariableType[] = ["dev", "stg"];

const BASIC_AUTH_USER = "basic-auth2";
const BASIC_AUTH_PASSWORD = "vercel";

export const config = {
  matcher: ["/", "/index"],
};

export const middleware = (req: NextRequest) => {
  console.log(env.clientEnv);
  if (!authRequiredEnvironments.includes(env.clientEnv)) {
    console.log("ok");
    return NextResponse.next();
  }

  const authorizationHeader = req.headers.get("authorization");
  console.log(authorizationHeader);

  if (authorizationHeader) {
    const basicAuth = authorizationHeader.split(" ")[1];
    const [user, password] = atob(basicAuth).split(":");
    console.log(basicAuth);

    if (user === BASIC_AUTH_USER && password === BASIC_AUTH_PASSWORD) {
      return NextResponse.next();
    }
  }

  const url = req.nextUrl;
  url.pathname = "/api/auth";

  return NextResponse.rewrite(url);
};
