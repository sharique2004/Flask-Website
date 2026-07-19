import { Router, type IRouter } from "express";
import healthRouter from "./health";
import { askRouter } from "./ask";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/ask", askRouter);

export default router;
