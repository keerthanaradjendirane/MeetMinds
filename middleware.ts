import { authMiddleware } from "@clerk/nextjs";
import { NextApiRequest, NextApiResponse } from "next";

export default authMiddleware((req: NextApiRequest, res: NextApiResponse) => {
    const { auth } = req;
    if (auth) {
        auth().protect();
    }
});

export const config = {
    api: {
        bodyParser: false,
    },
};
