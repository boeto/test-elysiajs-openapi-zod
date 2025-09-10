import { Elysia, t } from "elysia";
import z from "zod";

import openapi from "@elysiajs/openapi";
import { fromTypes } from "@elysiajs/openapi/gen";

const app = new Elysia()
  .use(
    openapi({
      references: fromTypes("src/index.ts"),
    })
  )
  .get("/test-zod", ({ query }) => query, {
    query: z.object({
      name: z.string(),
    }),
    response: z.object({
      name: z.string(),
    }),
  })
  .get("/test-typebox", ({ query }) => query, {
    query: t.Object({
      name: t.String(),
    }),
    response: t.Object({
      name: t.String(),
    }),
  })
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
