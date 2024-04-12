import { authMiddleware, /* createRouteMatcher */ } from "@clerk/nextjs";
/* const protectedRoutes = createRouteMatcher([
    '/',
    '/upcoming',
    '/previous',
    '/recordings',
    '/personal-room',
    '/meeting(.*)'
]) */
export default authMiddleware((auth: () => { (): any; new(): any; protect: { (): void; new(): any; }; }, req: any)=>{
if(req) auth().protect();
});
export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"]
};
