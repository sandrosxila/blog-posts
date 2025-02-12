export { default } from "next-auth/middleware"

export const config = {
  matcher: ["/", "/account-settings", "/add", "/edit/:postId", "/:userId/posts/", "/:userId/posts/:postId/"]
}