import { authMiddleware } from "@clerk/nextjs";
import { NextApiRequest, NextApiResponse } from "next";

export default authMiddleware(() => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        if (req.auth) {
            await req.auth().protect();
        }
    };
});

export const config = {
    api: {
        bodyParser: false,
    },
};
