import { AuthMiddleware, authMiddleware } from "@clerk/nextjs";

export default authMiddleware((auth: AuthMiddleware | undefined, req: any) => {
    if (auth && req) {
        auth().protect();
    }
});

export const config = {
    matcher: [
        "/((?!.+\\.[\\w]+$|_next).*)",
        "/(api|trpc)(.*)"
    ]
};
